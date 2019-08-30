/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { concat } from 'rxjs/observable/concat';
import { Toast } from 'cx-ui-components';
import { sdkPromise } from '../../../../utils/sdk';
import { startReportingSubscriptions, reportingSubscriptionStarted, setBulkAgentPendingAway } from './';
import { handleError, handleSuccess, handleBulkSuccess } from '../../entities/handleResult';
import {
  hasAgentReasonLists,
  getSelectedAgentsBulkChangeItems,
  getAgentCurrentState,
  getSelectedAgentsPendingAwayItems
} from './selectors';

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
        .catch(error => handleError(error, a))
    );

export const SetAgentPresenceState = action$ =>
  action$
    .ofType('SET_AGENT_PRESENCE_STATE', 'FORCE_LOGOUT_AGENT')
    .debounceTime(300)
    .concatMap(a =>
      fromPromise(
        sdkPromise({
          command: 'setPresenceState',
          data: {
            agentId: a.agentId,
            sessionId: a.sessionId,
            state: a.state || 'offline',
            ...(a.reasonId && { reasonId: a.reasonId, reason: a.reason, reasonListId: a.reasonListId })
          },
          module: 'session',
          topic: 'cxengage/session/set-presence-state-response'
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
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
    .debounceTime(300)
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
          handleBulkSuccess(allResult, null, `Direction for BULKED_ITEMS_AFFECTED agent(s) was updated successfully.`)
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
    .debounceTime(300)
    .map(a => ({
      ...a,
      bulkSelected: getSelectedAgentsBulkChangeItems(store.getState()),
      bulkNotAffected: getSelectedAgentsPendingAwayItems(store.getState()).toJS() || {}
    }))
    .filter(a => a.bulkSelected.size > 0)
    .map(a => {
      a.allSdkCalls = Object.values(a.bulkSelected.toJS()).reduce((bulkAgents, currentAgent) => {
        let bulkData = {
          ...{ agentId: currentAgent.agentId, sessionId: currentAgent.sessionId, state: a.state },
          ...(a.reasonId && { reasonId: a.reasonId, reason: a.reason, reasonListId: a.reasonListId })
        };
        // If agent is not busy, we are free to change
        // presence state to whatever we need
        if (getAgentCurrentState(store.getState(), currentAgent.agentId) !== 'busy') {
          bulkAgents.push({
            command: 'setPresenceState',
            module: 'session',
            topic: 'cxengage/session/set-presence-state-response',
            data: bulkData
          });
        } else if (a.state !== 'ready') {
          // If agent is busy and new state is not "ready", then
          // we add this agent to pending state map
          a.bulkNotAffected[currentAgent.agentId] = bulkData;
        }
        return bulkAgents;
      }, []);
      return { ...a };
    })
    .do(
      a =>
        a.allSdkCalls.length === 0 &&
        Object.keys(a.bulkNotAffected).length > 0 &&
        Toast.warning(`New pending state was changed, but none agent was affected yet.`)
    )
    .mergeMap(a =>
      concat(
        // We dispatch two new actions from here, one updates the
        // PendingAway state map, the second one loops over the
        // results to update all selected agents one by one
        of(setBulkAgentPendingAway(a.bulkNotAffected, a.state, a.reason, a.reasonId, a.reasonListId)),
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
              `An error occurred when trying to update presence state for BULKED_ITEMS_AFFECTED agent(s).`,
              `Presence state for BULKED_ITEMS_AFFECTED agent(s) was not affected.`
            )
          )
          .mergeMap(result =>
            from(result).map(response => handleSuccess(response, { ...a, agentId: response.resourceId }))
          )
      )
    );

// This Observable is used to catch updating data event,
// we get all agents that are pending away and try to
// update ThemeProvider, if not posible we update pending map
// with new agents
export const UpdateAgentPendingAway = (action$, store) =>
  action$
    .ofType('SET_AGENT_MONITORING_TABLE_DATA')
    .debounceTime(300)
    .map(a => ({
      ...a,
      pendingAwaySelected: getSelectedAgentsPendingAwayItems(store.getState())
    }))
    .filter(a => a.pendingAwaySelected.size > 0)
    .map(a => {
      a.bulkNotAffected = {};
      a.allSdkCalls = Object.values(a.pendingAwaySelected.toJS()).reduce((bulkAgents, currentAgent) => {
        let { agentId, sessionId, state, reason, reasonId, reasonListId } = currentAgent;
        let bulkData = { ...{ agentId, sessionId, state }, ...(reasonId && { reasonId, reason, reasonListId }) };
        // If agent is not busy, we are free to change
        // presence state to whatever we need
        if (getAgentCurrentState(store.getState(), agentId) !== 'busy') {
          bulkAgents.push({
            command: 'setPresenceState',
            module: 'session',
            topic: 'cxengage/session/set-presence-state-response',
            data: bulkData
          });
        } else {
          // If agent is busy and new state is not "ready", then
          // we add this agent to pending state map
          a.bulkNotAffected[agentId] = bulkData;
        }
        return bulkAgents;
      }, []);
      return { ...a };
    })
    .filter(a => a.allSdkCalls.length > 0 || a.bulkNotAffected.length > 0)
    .mergeMap(a =>
      concat(
        // We dispatch two new actions from here, one updates the
        // PendingAway state map, the second one loops over the
        // results to update all selected agents one by one
        of(setBulkAgentPendingAway(a.bulkNotAffected, a.state, a.reason, a.reasonId, a.reasonListId)),
        forkJoin(
          a.allSdkCalls.map(apiCall =>
            from(sdkPromise(apiCall).catch(error => ({ error: error, id: apiCall.data['agentId'] })))
          )
        )
          .do(allResult =>
            handleBulkSuccess(
              allResult,
              a,
              `BULKED_ITEMS_AFFECTED agent(s) were updated from "Busy" to new state successfully.`,
              `An error occurred when trying to update presence state from "Busy" for BULKED_ITEMS_AFFECTED agent(s).`,
              `Current presence state "Busy" of BULKED_ITEMS_AFFECTED agent(s) was not affected.`
            )
          )
          .mergeMap(result =>
            from(result).map(response => ({
              ...a,
              type: 'SET_BULK_AGENT_PRESENCE_STATE_FULFILLED',
              agentId: response.resourceId,
              response
            }))
          )
      )
    );
