/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/timeout';
import { zip } from 'rxjs/observable/zip';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

import { Toast } from 'cx-ui-components';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';

import { sdkPromise, sdkCall, errorLabel } from '../../../utils/sdk';

import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarMuted,
  selectSupervisorToolbarTwilioEnabled,
  selectTransitionCall,
  selectSessionId,
} from './selectors';

import {
  supervisorSubscriptionsAdded,
  monitorInteractionRequested,
  monitorInteractionInitializationCompleted,
  hangUpRequested,
  toggleMuteRequested,
  transitionCallEnding,
} from './index';

const WAIT_TIMEOUT = 10000;

function handleError(error, state) {
  Toast.error(errorLabel(error));
  localStorage.setItem('SupervisorToolbar', JSON.stringify(state.get('SupervisorToolbar').toJS()));
  sdkCall({ module: 'session', command: 'clearMonitoredInteraction' });
  return of({ type: 'cxengage/interactions/voice/silent-monitor-end' });
}

const WaitTwilioDeviceReady = (action$, store) =>
  action$
    .ofType('cxengage/twilio/device-ready')
    .timeout(WAIT_TIMEOUT)
    .take(1)
    .catch((error) => handleError(error, store.getState()));

const WaitSessionStarted = (action$, store) =>
  action$
    .ofType('cxengage/session/started')
    .timeout(WAIT_TIMEOUT)
    .take(1)
    .catch((error) => handleError(error, store.getState()));

const WaitCurrentSessionEnd = (action$, store) =>
  action$
    .ofType('cxengage/interactions/voice/silent-monitor-end')
    .timeout(WAIT_TIMEOUT)
    .take(1)
    .catch((error) => handleError(error, store.getState()));

// Start all the required subscriptions
export const StartBatchRequest = (action$, store) =>
  action$
    .ofType('START_SUPERVISOR_TOOLBAR_$')
    .debounceTime(400)
    .mergeMap((action) =>
      from([
        'cxengage/twilio/device-ready',
        'cxengage/session/started',
        'cxengage/session/state-change-request-acknowledged',
        'cxengage/interactions/voice/silent-monitor-start',
        'cxengage/interactions/voice/silent-monitor-end',
        'cxengage/interactions/voice/unmute-acknowledged',
        'cxengage/interactions/voice/mute-acknowledged',
        'cxengage/session/sqs-shut-down',
      ]).mergeMap((subscription) =>
        fromPromise(sdkCall({ module: 'subscribe', command: subscription })).mapTo(
          supervisorSubscriptionsAdded(subscription)
        )
      )
    );

export const CanSilentMonitor = (action$, store) =>
  action$.ofType('GET_CAN_SILENT_MONITOR').concatMap((a) =>
    fromPromise(
      sdkPromise({
        module: 'session',
        command: 'getRunningSessionState',
        topic: 'cxengage/session/get-running-session-state',
      })
    )
      .map((result) => ({
        ...a,
        canSilentMonitor:
          result.state === 'offline' ||
          (result.sessionId !== null && result.sessionId === selectSessionId(store.getState())),
        type: 'SET_CAN_SILENT_MONITOR',
      }))
      .catch((error) => {
        Toast.error(errorLabel(error));
        return {
          canSilentMonitor: false,
          type: 'SET_CAN_SILENT_MONITOR',
        };
      })
  );

export const MonitorInteractionInitialization = (action$, store) =>
  action$
    .ofType('MONITOR_INTERACTION_INITIALIZATION')
    .throttleTime(4000)
    .switchMap(({ interactionId, chosenExtension }) =>
      fromPromise(
        sdkPromise({
          module: 'monitorCall',
          data: { interactionId, chosenExtension },
          topic: 'monitorCall',
        })
      )
        .filter((response) => response !== 'cancelled')
        .mapTo(monitorInteractionInitializationCompleted())
    );

export const MonitorInteraction = (action$, store) =>
  action$
    .ofType('REQUESTING_MONITOR_CALL')
    .map((action) => ({
      ...action,
      twilioEnabled: selectSupervisorToolbarTwilioEnabled(store.getState()),
      transitionCall: selectTransitionCall(store.getState()),
      sessionIsActive: selectSessionId(store.getState()) !== '',
    }))
    .switchMap((a) => {
      if (a.chosenExtension.provider && a.chosenExtension.provider === 'twilio') {
        if (!a.twilioEnabled && !a.sessionIsActive) {
          // Waiting on twilio & call session to start
          return zip(WaitTwilioDeviceReady(action$, store), WaitSessionStarted(action$, store)).mapTo(a);
        } else if (!a.twilioEnabled && a.sessionIsActive) {
          // Waiting on twilio to start
          return zip(WaitTwilioDeviceReady(action$, store)).mapTo(a);
        } else if (a.twilioEnabled && !a.sessionIsActive) {
          // Waiting on session to start
          return zip(WaitSessionStarted(action$, store)).mapTo(a);
        } else if (a.twilioEnabled && a.sessionIsActive) {
          // Everything is ready
          if (a.transitionCall) {
            // Require call transition
            return zip(WaitCurrentSessionEnd(action$, store)).mapTo(a);
          } else {
            // Happy path!
            return from([a]);
          }
        }
      } else if (!a.sessionIsActive) {
        return zip(WaitSessionStarted(action$, store)).mapTo(a);
      } else if (a.transitionCall) {
        return zip(WaitCurrentSessionEnd(action$, store)).mapTo(a);
      } else {
        return from([a]);
      }
    })
    .switchMap((action) =>
      fromPromise(
        sdkCall(
          {
            module: 'interactions.voice',
            command: `silentMonitor`,
            data: {
              interactionId: action.interactionId,
              chosenExtension: action.chosenExtension,
            },
          },
          `monitorCall`
        )
      )
        .mapTo(monitorInteractionRequested(action.interactionId))
        .catch((error) => handleError(error, store.getState()))
    );

export const HangUpEpic = (action$, store) =>
  action$
    .ofType('REQUESTING_HANG_UP')
    .map((action) => ({
      ...action,
      interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(store.getState()),
      status: selectSupervisorToolbarSilentMonitoringStatus(store.getState()),
    }))
    .filter(({ status }) => status === 'connected')
    .mergeMap((a) => {
      return fromPromise(
        sdkPromise({
          module: 'comfirmPrompt',
          command: `Stop monitoring Interaction? ${a.interactionId}`,
          data: { interactionId: a.interactionId },
          topic: 'comfirmPrompt',
        })
      ).map((response) => ({
        ...a,
        confirmationResponse: response,
      }));
    })
    .filter(({ confirmationResponse }) => confirmationResponse)
    .switchMap((a) =>
      concat(
        of(a).mapTo(transitionCallEnding()),
        fromPromise(
          sdkPromise({
            module: 'interactions.voice',
            command: 'resourceRemove',
            data: { interactionId: a.interactionId },
            topic: 'cxengage/interactions/voice/resource-removed-acknowledged',
          })
        )
          .mapTo(hangUpRequested())
          .catch((error) => handleError(error, store.getState()))
      )
    );

export const MonitorInteractionEnded = (action$, store) =>
  action$.ofType('HANG_UP_REQUESTED_$').switchMap(({ interactionId }) =>
    fromPromise(
      sdkPromise({
        module: 'monitorCallEnded',
        data: { interactionId },
        topic: 'monitorCallEnded',
      })
    ).mapTo({ type: 'HANG_UP_ENDED_$' })
  );

export const ToggleMuteEpic = (action$, store) =>
  action$
    .ofType('REQUESTING_TOGGLE_MUTE')
    .map((action) => ({
      ...action,
      interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(store.getState()),
      status: selectSupervisorToolbarSilentMonitoringStatus(store.getState()),
      muted: selectSupervisorToolbarMuted(store.getState()),
    }))
    .filter(({ status }) => status === 'connected')
    .switchMap((a) =>
      fromPromise(
        sdkPromise({
          module: 'interactions.voice',
          command: a.muted ? 'unmute' : 'mute',
          data: { interactionId: a.interactionId },
          topic: a.muted
            ? 'cxengage/interactions/voice/unmute-acknowledged'
            : 'cxengage/interactions/voice/mute-acknowledged',
        })
      )
        .mapTo(toggleMuteRequested())
        .catch((error) => handleError(error, store.getState()))
    );

export const SqsSessionLost = (action$) =>
  action$
    .ofType('cxengage/session/sqs-shut-down')
    .do((a) => {
      alert('Session was lost or expired please refresh to monitor interactions.');
    })
    .mapTo({ type: 'SQS_SHUT_DOWN_ALERTED_$' });
