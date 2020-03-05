/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { sdkPromise } from '../../../../utils/sdk';
import { startReportingSubscriptions, reportingSubscriptionStarted } from './';
import { handleError, handleSuccess, handleBulkSuccess } from '../../entities/handleResult';
import { hasAgentReasonLists, getSelectedAgentsBulkChangeItems, getAgentCurrentState, isAgentStale } from './selectors';

export const StartBatchRequest = action$ =>
  action$.ofType('START_AGENT_MONITORING_REPORTING_BATCH_REQUEST_$').switchMap(() =>
    fromPromise(
      sdkPromise({
        module: 'reporting',
        command: `bulkAddStatSubscription`,
        data: {
          queries: [
            { statistic: 'resource-capacity', statId: 'resource-capacity' },
            { statistic: 'resource-state-list', statId: 'resource-state-list' }
          ]
        },
        topic: `cxengage/reporting/stat-subscription-added`
      })
    ).mapTo(startReportingSubscriptions())
  );

export const StartBatchSubscription = action$ =>
  action$.ofType('START_AGENT_MONITORING_REPORTING_SUBSCRIPTION_$').switchMap(() =>
    fromPromise(
      sdkPromise({
        module: 'subscribe',
        command: 'cxengage/reporting/batch-response',
        topic: 'cxengage/reporting/batch-response'
      })
    ).mapTo(reportingSubscriptionStarted())
  );

export const SetAgentDirection = action$ =>
  action$
    .ofType('SET_AGENT_DIRECTION')
    .debounceTime(300)
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          command: 'setDirection',
          data: { agentId: a.agentId, sessionId: a.sessionId, direction: a.direction },
          module: 'session',
          topic: 'cxengage/session/set-direction-response'
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a, 'Failed to update Work Mode for this agent. Please try again.'))
    );

export const SetAgentPresenceState = (action$, store) =>
  action$
    .ofType('SET_AGENT_PRESENCE_STATE')
    .debounceTime(300)
    .map(a => ({
      ...a,
      agentCurrentState: getAgentCurrentState(store.getState(), a.agentId)
    }))
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          command: 'setPresenceState',
          data: {
            agentId: a.agentId,
            sessionId: a.sessionId,
            state: a.state || 'offline',
            forceLogout: true,
            ...(a.reasonId && { reasonId: a.reasonId, reason: a.reason, reasonListId: a.reasonListId })
          },
          module: 'session',
          topic: 'cxengage/session/set-presence-state-response'
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error =>
          handleError(error, a, 'A Presence State change is already in progress for this agent. Please try again.')
        )
    );

export const fetchAgentReasons = (action$, store) =>
  action$
    .ofType('GET_AGENT_REASON_LISTS')
    .filter(() => !hasAgentReasonLists(store.getState()))
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          data: { path: ['users', a.agentId, 'reason-lists'] },
          command: 'getEntity',
          topic: `cxengage/entities/get-entity-response`
        })
      )
        .map(response => ({
          type: 'SET_AGENT_REASON_LISTS_DATA',
          agentId: a.agentId,
          arrayOfReasonListData: response.result
        }))
        .catch(error => handleError(error, a))
    );

export const SetBulkAgentDirection = (action$, store) =>
  action$
    .ofType('SET_BULK_AGENT_DIRECTION')
    .debounceTime(1000)
    .map(a => ({ ...a, bulkSelected: getSelectedAgentsBulkChangeItems(store.getState()) }))
    .filter(a => a.bulkSelected.size > 0)
    .map(a => ({
      ...a,
      allSdkCalls: Object.values(a.bulkSelected.toJS()).map(item => ({
        command: 'setDirection',
        module: 'session',
        topic: 'cxengage/session/set-direction-response',
        data: { agentId: item.agentId, sessionId: item.sessionId, direction: a.direction }
      }))
    }))
    .mergeMap(a =>
      forkJoin(
        a.allSdkCalls.map(apiCall =>
          from(sdkPromise(apiCall).catch(error => ({ error: error, id: apiCall.data['agentId'] })))
        )
      )
        .do(allResult =>
          handleBulkSuccess(
            allResult,
            null,
            `Work Mode for BULKED_ITEMS_AFFECTED agent(s) was updated successfully.`,
            'Failed to update Work Mode for BULKED_ITEMS_AFFECTED agent(s). Please try again.'
          )
        )
        .mergeMap(result =>
          from(result).map(response =>
            handleSuccess(response, {
              ...a,
              agentId: a.allSdkCalls.find(call => call.data.sessionId === response.sessionId).data.agentId
            })
          )
        )
    );

export const SetBulkAgentPresenceState = (action$, store) =>
  action$
    .ofType('SET_BULK_AGENT_PRESENCE_STATE')
    .debounceTime(1000)
    .map(a => ({
      ...a,
      bulkSelected: getSelectedAgentsBulkChangeItems(store.getState())
    }))
    .filter(a => a.bulkSelected.size > 0)
    .map(a => {
      const bulkData = {
        // If agent is not busy, we are free to change
        // presence state to whatever we need
        state: a.state,
        // If we set agent to Away, we choose a reason
        // otherwise, reason should be sent empty
        ...(a.reasonId && { reasonId: a.reasonId, reason: a.reason, reasonListId: a.reasonListId })
      };
      a.allSdkCalls = Object.values(a.bulkSelected.toJS()).reduce(
        (bulkAgents, currentAgent) => [
          ...bulkAgents,
          {
            command: 'setPresenceState',
            module: 'session',
            topic: 'cxengage/session/set-presence-state-response',
            data: {
              agentId: currentAgent.agentId,
              sessionId: currentAgent.sessionId,
              // To force logout an agent when performing bulk actions
              forceLogout: true,
              ...bulkData
            }
          }
        ],
        []
      );
      return { ...a };
    })
    .mergeMap(a =>
      forkJoin(
        a.allSdkCalls.map(apiCall =>
          from(sdkPromise(apiCall).catch(error => ({ error: error, id: apiCall.data['agentId'] })))
        )
      )
        .do(allResult =>
          handleBulkSuccess(
            allResult,
            a,
            `Presence state for BULKED_ITEMS_AFFECTED agent(s) was updated successfully.`,
            `A Presence State change is already in progress for BULKED_ITEMS_AFFECTED of the selected agents. Please try again.`
          )
        )
        .mergeMap(result =>
          from(result).map(response =>
            handleSuccess(response, {
              ...a,
              agentId: response.resourceId,
              agentCurrentState: getAgentCurrentState(store.getState(), response.resourceId)
            })
          )
        )
    );
