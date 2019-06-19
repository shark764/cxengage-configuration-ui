/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

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
          updatedEndpoints.push({ ...currentEndpoint, draggableUUID: generateUUID(), endpointUUID: generateUUID() });
          return updatedEndpoints;
        }
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
        const endpoints = a.values
          .map(endpoint =>
            endpoint
              .delete('draggableUUID')
              .delete('endpointUUID')
              .delete('droppableUUID')
              .delete('categoryUUID')
          )
          .toJS();
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          active: getSelectedEntityStatus(store.getState()),
          endpoints: endpoints
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
          updatedEndpoints.push({ ...currentEndpoint, draggableUUID: generateUUID(), endpointUUID: generateUUID() });
          return updatedEndpoints;
        }
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
          .filter(
            endpoint =>
              endpoint.get('hierarchy') && endpoint.get('hierarchy').trim() !== a.categoryId && a.categoryId.trim()
          )
          .map(endpoint =>
            endpoint
              .delete('endpointUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      }
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
          endpoint =>
            endpoint.get('hierarchy') && endpoint.get('hierarchy').trim() !== a.categoryId && a.categoryId.trim()
        );
      }
      return { ...a, updatedEndpoints };
    })
    .map(a => {
      if (a.updatedEndpoints.size > 0) {
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

export const RegisterTransferListCheckboxes = (action$, store) =>
  action$
    .ofType('SET_SELECTED_SUB_ENTITY_ID')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'transferLists')
    .filter(
      ({ selectedSubEntityId }) =>
        selectedSubEntityId &&
        (selectedSubEntityId === 'create' || selectedSubEntityId.includes('updateTransferListItem'))
    )
    .concatMap(a => [
      {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: `transferListItems:${a.selectedSubEntityId}` },
        payload: {
          name: 'warmTransfer',
          type: 'Field'
        }
      },
      {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: `transferListItems:${a.selectedSubEntityId}` },
        payload: {
          name: 'coldTransfer',
          type: 'Field'
        }
      }
    ]);
