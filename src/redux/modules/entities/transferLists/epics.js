/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import { fromJS, List } from 'immutable';
import { generateUUID } from 'serenova-js-utils/uuid';
import { getCurrentFormValueByFieldName } from '../../form/selectors';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity, getSelectedEntityStatus } from '../selectors';

export const getQueuesAfterFetchingTransferLists = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'transferLists')
    .map(a => ({ type: 'FETCH_DATA', entityName: 'queues' }));

export const InitTransferListsForm = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'transferLists')
    .map(a => {
      // draganddrop-beautiful-dnd library used in transferLists component needs UUIDS:
      a.response.result.endpoints = a.response.result.endpoints.reduce((updatedEndpoints, currentEndpoint) => {
        const categoryExists = updatedEndpoints.find(value => value.hierarchy === currentEndpoint.hierarchy);
        if (!categoryExists) {
          updatedEndpoints.push({
            ...currentEndpoint,
            droppableUUID: generateUUID(),
            categoryUUID: generateUUID(),
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID()
          });
          return updatedEndpoints;
        } else {
          updatedEndpoints.push({
            ...currentEndpoint,
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID(),
            categoryUUID: categoryExists.categoryUUID,
            droppableUUID: categoryExists.droppableUUID
          });
          return updatedEndpoints;
        }
      }, []);

      // CheckboxField collects it's values in an array, convert warmTansfer & coldTransfer checkbox values in to array(warmColdTransfer):
      a.response.result.endpoints = a.response.result.endpoints.reduce((accumEndpoints, currentEndpoint) => {
        const obj = {};
        for (let key in currentEndpoint) {
          if ((key === 'warmTransfer' || key === 'coldTransfer') && currentEndpoint[key]) {
            !obj['warmColdTransfer'] ? (obj['warmColdTransfer'] = [key]) : obj['warmColdTransfer'].push(key);
          } else if (key !== 'warmTransfer' && key !== 'coldTransfer') {
            obj[key] = currentEndpoint[key];
          }
        }
        accumEndpoints.push(obj);
        return accumEndpoints;
      }, []);

      a.response.result = {
        name: a.response.result.name,
        description: a.response.result.description,
        endpoints: a.response.result.endpoints
      };
      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.id}`
      },
      payload: { ...a.response.result }
    }));

export const TransferListsSubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'transferLists')
    .map(a => {
      if (a.entityId === 'create') {
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'endpoints',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.values
        };
      } else {
        // Removes all the UUIDS that were to render the transferList dragAndDrop component:
        let endpoints = a.values.map(endpoint =>
          endpoint
            .delete('draggableUUID')
            .delete('endpointUUID')
            .delete('droppableUUID')
            .delete('categoryUUID')
        );
        // convert endpoint array values(warmColdTransfer) in to their own values (warmTransfer & coldTransfer):
        endpoints = endpoints.reduce((accumVal, currentEndpoint) => {
          if (List.isList(currentEndpoint.get('warmColdTransfer'))) {
            const obj = {};
            currentEndpoint.get('warmColdTransfer').forEach(transferType => {
              obj[transferType] = true;
            });
            return accumVal.push(currentEndpoint.merge(fromJS(obj)).remove('warmColdTransfer'));
          }
          return accumVal.push(currentEndpoint.remove('warmColdTransfer'));
        }, List());

        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          active: getSelectedEntityStatus(store.getState()),
          endpoints: endpoints.toJS()
        };
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: values
        };
      }
    });

export const ReInitTransferListsForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'transferLists')
    .map(a => {
      // Add UUIDS to the endpoints for the dragAndDrop library to work:
      a.values.endpoints = a.values.endpoints.reduce((updatedEndpoints, currentEndpoint) => {
        const categoryExists = updatedEndpoints.find(value => value.hierarchy === currentEndpoint.hierarchy);
        if (!categoryExists) {
          updatedEndpoints.push({
            ...currentEndpoint,
            droppableUUID: generateUUID(),
            categoryUUID: generateUUID(),
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID()
          });
          return updatedEndpoints;
        } else {
          updatedEndpoints.push({
            ...currentEndpoint,
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID(),
            categoryUUID: categoryExists.categoryUUID,
            droppableUUID: categoryExists.droppableUUID
          });
          return updatedEndpoints;
        }
      }, []);

      // CheckboxField collects it's values in an array, convert warmTansfer & coldTransfer checkbox values in to array(warmColdTransfer):
      a.values.endpoints = a.values.endpoints.reduce((accumEndpoints, currentEndpoint) => {
        const obj = {};
        for (let key in currentEndpoint) {
          if ((key === 'warmTransfer' || key === 'coldTransfer') && currentEndpoint[key]) {
            !obj['warmColdTransfer'] ? (obj['warmColdTransfer'] = [key]) : obj['warmColdTransfer'].push(key);
          } else if (key !== 'warmTransfer' && key !== 'coldTransfer') {
            obj[key] = currentEndpoint[key];
          }
        }
        accumEndpoints.push(obj);
        return accumEndpoints;
      }, []);

      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`
      },
      payload: { ...a.values }
    }));

export const DeleteTransferListItem = (action$, store) =>
  action$
    .ofType('REMOVE_TRANSFER_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entity: getSelectedEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId !== 'create')
    .map(a => {
      let updatedEndpoints;
      if (a.transferListItemId) {
        // Deletes all the UUIDs:
        updatedEndpoints = getCurrentFormValueByFieldName(store.getState(), 'endpoints')
          .filter(endpoint => endpoint.get('endpointUUID') !== a.transferListItemId)
          .map(endpoint =>
            endpoint
              .delete('endpointUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      } else if (a.categoryId) {
        updatedEndpoints = getCurrentFormValueByFieldName(store.getState(), 'endpoints')
          .filter(endpoint => endpoint.get('categoryUUID') !== a.categoryId)
          .map(endpoint =>
            endpoint
              .delete('endpointUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      }
      // convert endpoint array values(warmColdTransfer) in to their own values (warmTransfer & coldTransfer):
      updatedEndpoints = updatedEndpoints.reduce((accumVal, currentEndpoint) => {
        if (List.isList(currentEndpoint.get('warmColdTransfer'))) {
          const obj = {};
          currentEndpoint.get('warmColdTransfer').forEach(transferType => {
            obj[transferType] = true;
          });
          return accumVal.push(currentEndpoint.merge(fromJS(obj)).remove('warmColdTransfer'));
        }
        return accumVal.push(currentEndpoint.remove('warmColdTransfer'));
      }, List());
      return { ...a, updatedEndpoints };
    })
    .map(a => {
      if (a.updatedEndpoints.size > 0) {
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: {
            name: a.entity.get('name'),
            active: a.entity.get('active'),
            description: a.entity.get('description'),
            endpoints: a.updatedEndpoints.toJS()
          }
        };
      } else {
        return {
          type: 'TRANSFER_LIST_CANNOT_BE_EMPTY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState())
        };
      }
    });

export const RemoveTransferListItem = (action$, store) =>
  action$
    .ofType('REMOVE_TRANSFER_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId === 'create')
    .map(a => {
      let updatedEndpoints;
      if (a.transferListItemId) {
        updatedEndpoints = getCurrentFormValueByFieldName(store.getState(), 'endpoints').filter(
          endpoint => endpoint.get('endpointUUID') !== a.transferListItemId
        );
      } else if (a.categoryId) {
        updatedEndpoints = getCurrentFormValueByFieldName(store.getState(), 'endpoints').filter(
          endpoint => endpoint.get('categoryUUID') !== a.categoryId
        );
      }
      return { ...a, updatedEndpoints };
    })
    .map(a => {
      if (a.updatedEndpoints && a.updatedEndpoints.size > 0) {
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'endpoints',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.updatedEndpoints
        };
      } else {
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description')
        };
        return {
          type: '@@redux-form/INITIALIZE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`
          },
          payload: values
        };
      }
    });
