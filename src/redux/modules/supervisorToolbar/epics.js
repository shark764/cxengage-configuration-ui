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
import { zip } from 'rxjs/observable/zip';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';

import { sdkPromise, sdkCall } from '../../../utils/sdk';

import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarMuted,
  selectSupervisorToolbarTwilioEnabled
} from './selectors';

import {
  supervisorSubscriptionsAdded,
  monitorInteractionRequested,
  monitorInteractionInitializationCompleted,
  hangUpRequested,
  endSessionRequested,
  toggleMuteRequested
} from './index';

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
    .switchMap(({ interactionId }) =>
      fromPromise(
        sdkCall({ module: 'monitorCall', data: { interactionId } })
      ).mapTo(monitorInteractionInitializationCompleted())
    );

export const MonitorInteraction = (action$, store) =>
  action$
    .ofType('REQUESTING_MONITOR_CALL')
    .map(action => ({
      ...action,
      twilioEnabled: selectSupervisorToolbarTwilioEnabled(store.getState())
    }))
    .switchMap(action => {
      if (
        action.defaultExtensionProvider === 'twilio' &&
        !action.twilioEnabled
      ) {
        return zip(
          action$.ofType('cxengage/twilio/device-ready').take(1),
          action$.ofType('cxengage/session/started').take(1)
        ).mapTo(action);
      } else {
        return action$
          .ofType('cxengage/session/started')
          .take(1)
          .mapTo(action);
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
      ).mapTo(monitorInteractionRequested(action.interactionId))
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
      fromPromise(
        sdkPromise(
          {
            module: 'interactions.voice',
            command: 'resourceRemove',
            data: { interactionId: a.interactionId }
          },
          'cxengage/interactions/voice/resource-removed-acknowledged'
        )
      ).mapTo(hangUpRequested())
    );

export const EndSessionOnSilentMonitoringEnd = (action$, store) =>
  action$
    .ofType('cxengage/interactions/voice/silent-monitor-end')
    .switchMap(a =>
      fromPromise(
        sdkCall({ module: 'authentication', command: 'logout' })
      ).mapTo(endSessionRequested())
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
      ).mapTo(toggleMuteRequested())
    );
