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
  isSessionActive
} from './selectors';

import {
  supervisorSubscriptionsAdded,
  monitorInteractionRequested,
  monitorInteractionInitializationCompleted,
  hangUpRequested,
  toggleMuteRequested,
  transitionCallEnding
} from './index';

function handleError(error, state) {
  Toast.error(errorLabel(error));
  localStorage.setItem(
    'SupervisorToolbar',
    JSON.stringify(state.get('SupervisorToolbar').toJS())
  );
  sdkCall({ module: 'session', command: 'clearMonitoredInteraction' });
  return of({ type: 'cxengage/interactions/voice/silent-monitor-end' });
}

// Start all the required subscriptions
export const StartBatchRequest = (action$, store) =>
  action$
    .ofType('START_SUPERVISOR_TOOLBAR_$')
    .debounceTime(400)
    .mergeMap(action =>
      from([
        'cxengage/session/extension-list',
        'cxengage/twilio/device-ready',
        'cxengage/session/started',
        'cxengage/session/state-change-request-acknowledged',
        'cxengage/interactions/voice/silent-monitor-start',
        'cxengage/interactions/voice/silent-monitor-end',
        'cxengage/interactions/voice/unmute-acknowledged',
        'cxengage/interactions/voice/mute-acknowledged',
        'cxengage/session/sqs-shut-down'
      ]).mergeMap(subscription =>
        fromPromise(
          sdkCall({ module: 'subscribe', command: subscription })
        ).mapTo(supervisorSubscriptionsAdded(subscription))
      )
    );

export const MonitorInteractionInitialization = (action$, store) =>
  action$
    .ofType('MONITOR_INTERACTION_INITIALIZATION')
    .throttleTime(4000)
    .switchMap(({ interactionId }) =>
      fromPromise(
        sdkPromise(
          {
            module: 'monitorCall',
            data: { interactionId },
            topic: 'monitorCall'
          },
          `monitorCall`
        )
      )
        .filter(response => response !== 'cancelled')
        .mapTo(monitorInteractionInitializationCompleted())
    );

export const MonitorInteraction = (action$, store) =>
  action$
    .ofType('REQUESTING_MONITOR_CALL')
    .map(action => ({
      ...action,
      twilioEnabled: selectSupervisorToolbarTwilioEnabled(store.getState()),
      transitionCall: selectTransitionCall(store.getState()),
      sessionIsActive: isSessionActive(store.getState())
    }))
    .switchMap(a => {
      if (a.defaultExtensionProvider === 'twilio') {
        if (!a.twilioEnabled && !a.sessionIsActive) {
          return zip(
            action$.ofType('cxengage/twilio/device-ready').take(1),
            action$.ofType('cxengage/session/started').take(1)
          ).mapTo(a);
        } else if (!a.twilioEnabled && a.sessionIsActive) {
          return zip(
            action$.ofType('cxengage/twilio/device-ready').take(1)
          ).mapTo(a);
        } else if (a.twilioEnabled && !a.sessionIsActive) {
          return zip(action$.ofType('cxengage/session/started').take(1)).mapTo(
            a
          );
        } else if (a.twilioEnabled && a.sessionIsActive) {
          if (a.transitionCall) {
            return zip(
              action$
                .ofType('cxengage/interactions/voice/silent-monitor-end')
                .take(1)
            ).mapTo(a);
          } else {
            return from([a]);
          }
        }
      } else if (!a.sessionIsActive) {
        return zip(action$.ofType('cxengage/session/started').take(1)).mapTo(a);
      } else if (a.transitionCall) {
        return zip(
          action$
            .ofType('cxengage/interactions/voice/silent-monitor-end')
            .take(1)
        ).mapTo(a);
      } else {
        return from([a]);
      }
    })
    .switchMap(action =>
      fromPromise(
        sdkCall(
          {
            module: 'interactions.voice',
            command: `silentMonitor`,
            data: { interactionId: action.interactionId }
          },
          `monitorCall`
        )
      )
        .mapTo(monitorInteractionRequested(action.interactionId))
        .catch(error => handleError(error, store.getState()))
    );

export const HangUpEpic = (action$, store) =>
  action$
    .ofType('REQUESTING_HANG_UP')
    .map(action => ({
      ...action,
      interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(
        store.getState()
      ),
      status: selectSupervisorToolbarSilentMonitoringStatus(store.getState())
    }))
    .filter(({ status }) => status === 'connected')
    .mergeMap(a => {
      return fromPromise(
        sdkPromise(
          {
            module: 'comfirmPrompt',
            command: `Stop monitoring Interaction? ${a.interactionId}`,
            data: { interactionId: a.interactionId }
          },
          'comfirmPrompt'
        )
      ).map(response => ({
        ...a,
        confirmationResponse: response
      }));
    })
    .filter(({ confirmationResponse }) => confirmationResponse)
    .switchMap(a =>
      concat(
        of(a).mapTo(transitionCallEnding()),
        fromPromise(
          sdkPromise(
            {
              module: 'interactions.voice',
              command: 'resourceRemove',
              data: { interactionId: a.interactionId }
            },
            'cxengage/interactions/voice/resource-removed-acknowledged'
          )
        )
          .mapTo(hangUpRequested())
          .catch(error => handleError(error, store.getState()))
      )
    );

export const ToggleMuteEpic = (action$, store) =>
  action$
    .ofType('REQUESTING_TOGGLE_MUTE')
    .map(action => ({
      ...action,
      interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(
        store.getState()
      ),
      status: selectSupervisorToolbarSilentMonitoringStatus(store.getState()),
      muted: selectSupervisorToolbarMuted(store.getState())
    }))
    .filter(({ status }) => status === 'connected')
    .switchMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'interactions.voice',
            command: a.muted ? 'unmute' : 'mute',
            data: { interactionId: a.interactionId }
          },
          a.muted
            ? 'cxengage/interactions/voice/unmute-acknowledged'
            : 'cxengage/interactions/voice/mute-acknowledged'
        )
      )
        .mapTo(toggleMuteRequested())
        .catch(error => handleError(error, store.getState()))
    );

export const SqsSessionLost = action$ =>
  action$
    .ofType('cxengage/session/sqs-shut-down')
    .do(a => {
      alert(
        'Session was lost or expired please refresh to monitor interactions.'
      );
    })
    .mapTo({ type: 'SQS_SHUT_DOWN_ALERTED_$' });
