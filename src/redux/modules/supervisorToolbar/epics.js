/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
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

// Start all the required subscriptions
export const startBatchRequest = (action$, store) =>
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
      ]).mergeMap(sub =>
        fromPromise(sdkCall({ module: 'subscribe', command: sub })).map(
          response => ({
            type: 'SUPERVISOR_TOOLBAR_SUBSCRIPTIONS_ADDED_$',
            sub
          })
        )
      )
    );

export const monitorInteraction = (action$, store) =>
  action$.ofType('REQUESTING_MONITOR_CALL').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'interactions.voice',
          command: `silentMonitor`,
          data: { interactionId: action.interactionId }
        },
        `monitorCall`
      )
    ).map(response => ({ type: 'MONITOR_INTERACTION_REQUESTED' }))
  );

export const silentMonitorEpic = (action$, store) =>
  action$.ofType('SET_SILENT_MONITORING_INTERACTION_ID').switchMap(a =>
    fromPromise(
      sdkPromise(
        {
          module: 'interactions.voice',
          command: `silentMonitor`,
          data: { interactionId: a.interactionId }
        },
        'cxengage/interactions/voice/silent-monitoring-start-acknowledged'
      )
    ).map(response => ({ type: 'MONITOR_INTERACTION_REQUESTED' }))
  );

export const hangUpEpic = (action$, store) =>
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
      ).map(response => ({ type: 'HANG_UP_REQUESTED_$' }))
    );

export const toggleMuteEpic = (action$, store) =>
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
      ).map(response => ({ type: 'TOGGLE_MUTE_REQUESTED_$' }))
    );
