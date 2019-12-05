/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { generateUUID } from 'serenova-js-utils/uuid';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../selectors';
import { getCurrentFormValueByFieldName } from '../../form/selectors';
import { entitiesMetaData } from '../metaData';
import { fromJS } from 'immutable';

export const UpdatePresenceDispositionList = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .map(a => {
      a.sdkCall = entitiesMetaData['dispositionLists'].entityApiRequest('update', 'singleMainEntity');

      a.values.active = getSelectedEntity(store.getState()).get('active');
      a.sdkCall.data = {
        ...a.values,
        dispositionListId: a.entityId,
        dispositions: a.values.dispositions.map(({ dispositionId, sortOrder, hierarchy }) => ({
          dispositionId,
          sortOrder,
          hierarchy
        }))
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Disposition List was updated successfully!`))
        .catch(error => handleError(error, a))
    );

export const FetchData = action$ =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .mergeMap(a =>
      fromPromise(
        sdkPromise({
          module: 'entities',
          command: 'getEntity',
          topic: 'cxengage/entities/get-entity-response',
          data: {
            path: ['disposition-lists']
          }
        })
      )
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const FetchDataItem = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM')
    .debounceTime(300)
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .map(a => {
      a.sdkCall = {
        module: 'entities',
        command: 'getEntity',
        topic: 'cxengage/entities/get-entity-response',
        data: {
          path: ['disposition-lists', a.id]
        }
      };
      return { ...a };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const getdispositionsAfterFetchingdispositionsLists = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'dispositionLists')
    .map(() => ({ type: 'FETCH_DATA', entityName: 'dispositions' }));

export const InitDispositionListsForm = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'dispositionLists')
    .map(a => {
      a.response.result.dispositions = a.response.result.dispositions
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .reduce((updatedDispositions, currentDisposition) => {
          const categoryExists = updatedDispositions.find(
            value => value.hierarchy[0] === currentDisposition.hierarchy[0]
          );
          if (!categoryExists) {
            updatedDispositions.push({
              ...currentDisposition,
              droppableUUID: generateUUID(),
              categoryUUID: generateUUID(),
              draggableUUID: generateUUID(),
              endpointUUID: generateUUID()
            });
            return updatedDispositions;
          } else {
            updatedDispositions.push({
              ...currentDisposition,
              draggableUUID: generateUUID(),
              endpointUUID: generateUUID(),
              categoryUUID: categoryExists.categoryUUID,
              droppableUUID: categoryExists.droppableUUID
            });
            return updatedDispositions;
          }
        }, []);

      a.response.result = {
        name: a.response.result.name,
        externalId: a.response.result.externalId,
        description: a.response.result.description,
        dispositions: a.response.result.dispositions,
        shared: a.response.result.shared
      };
      return a;
    })
    .map(a => {
      return {
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: `${a.entityName}:${a.id}`
        },
        payload: { ...a.response.result }
      };
    });

//Functions for items

export const DispositionListsSubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .map(a => {
      if (a.entityId === 'create') {
        // Checking dispositions with same hierarchy but different category uuid
        // Transfer List does not have this but needs one
        a.values = a.values.map(disposition => {
          let firstOccur = a.values.find(first => disposition.get('hierarchy')[0] === first.get('hierarchy')[0]);
          if (firstOccur && firstOccur.get('categoryUUID') !== disposition.get('categoryUUID')) {
            disposition = disposition.set('categoryUUID', firstOccur.get('categoryUUID'));
          }
          return disposition;
        });
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'dispositions',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.values
        };
      } else {
        const dispositions = a.values
          .map(disposition =>
            fromJS({
              dispositionId: disposition.get('dispositionId'),
              sortOrder: disposition.get('sortOrder'),
              hierarchy: disposition.get('hierarchy')
            })
          )
          .toJS();
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          externalId: getCurrentFormValueByFieldName(store.getState(), 'externalId'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          shared: getCurrentFormValueByFieldName(store.getState(), 'shared'),
          dispositions: dispositions.map((disposition, index) => ({ ...disposition, sortOrder: index })),
          active: getSelectedEntity(store.getState()).get('active')
        };
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: values
        };
      }
    });

export const ReInitDispositionListsForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'dispositionLists')
    .map(a => {
      a.values.dispositions = a.response.result.dispositions.reduce((updatedDispositions, currentDisposition) => {
        const categoryExists = updatedDispositions.find(
          value => value.hierarchy[0] === currentDisposition.hierarchy[0]
        );
        if (!categoryExists) {
          updatedDispositions.push({
            ...currentDisposition,
            droppableUUID: generateUUID(),
            categoryUUID: generateUUID(),
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID()
          });
          return updatedDispositions;
        } else {
          updatedDispositions.push({
            ...currentDisposition,
            draggableUUID: generateUUID(),
            endpointUUID: generateUUID(),
            categoryUUID: categoryExists.categoryUUID,
            droppableUUID: categoryExists.droppableUUID
          });
          return updatedDispositions;
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

export const DeleteDispositionListItem = (action$, store) =>
  action$
    .ofType('REMOVE_DISPOSITION_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entity: getSelectedEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId !== 'create')
    .map(a => {
      let updatedDispositions;
      if (a.dispositionListItemId) {
        updatedDispositions = getCurrentFormValueByFieldName(store.getState(), 'dispositions')
          .filter(disposition => disposition.get('endpointUUID') !== a.dispositionListItemId)
          .map(disposition =>
            disposition
              .delete('endpointUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      } else if (a.categoryId) {
        updatedDispositions = getCurrentFormValueByFieldName(store.getState(), 'dispositions')
          .filter(disposition => disposition.get('categoryUUID') !== a.categoryId)
          .map(disposition =>
            disposition
              .delete('endpointUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      }
      updatedDispositions = updatedDispositions.map((disposition, index) => disposition.set('sortOrder', index));
      return { ...a, updatedDispositions };
    })
    .map(a => {
      if (a.updatedDispositions && a.updatedDispositions.size > 0) {
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: {
            name: a.entity.get('name'),
            externalId: a.entity.get('externalId'),
            description: a.entity.get('description'),
            dispositions: a.updatedDispositions.toJS(),
            shared: a.entity.get('shared')
          }
        };
      } else {
        return {
          type: 'DISPOSITION_LIST_CANNOT_BE_EMPTY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState())
        };
      }
    });

export const RemoveDispositionListItem = (action$, store) =>
  action$
    .ofType('REMOVE_DISPOSITION_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId === 'create')
    .map(a => {
      let updatedDispositions;
      if (a.dispositionListItemId) {
        updatedDispositions = getCurrentFormValueByFieldName(store.getState(), 'dispositions').filter(
          disposition => disposition.get('endpointUUID') !== a.dispositionListItemId
        );
      } else if (a.categoryId) {
        updatedDispositions = getCurrentFormValueByFieldName(store.getState(), 'dispositions').filter(
          disposition => disposition.get('categoryUUID') !== a.categoryId
        );
      }
      return { ...a, updatedDispositions };
    })
    .map(a => {
      if (a.updatedDispositions && a.updatedDispositions.size > 0) {
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'dispositions',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.updatedDispositions
        };
      } else {
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          externalId: getCurrentFormValueByFieldName(store.getState(), 'externalId'),
          shared: getCurrentFormValueByFieldName(store.getState(), 'shared'),
          active: getCurrentFormValueByFieldName(store.getState(), 'active')
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
