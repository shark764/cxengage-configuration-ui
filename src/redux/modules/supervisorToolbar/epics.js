/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';

import { sdkPromise, sdkCall } from '../../../utils/sdk';

import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarMuted
} from './selectors';

import {
  supervisorSubscriptionsAdded,
  monitorInteractionRequested,
  hangUpRequested,
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

export const MonitorInteraction = (action$, store) =>
  action$.ofType('REQUESTING_MONITOR_CALL').switchMap(action =>
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
