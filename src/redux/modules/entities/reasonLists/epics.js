import 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { getCurrentFormValueByFieldName } from '../../form/selectors';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity } from '../selectors';
import { generateUUID } from 'serenova-js-utils/uuid';

export const UpdatePresenceReasonList = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'reasonLists')
    .map(a => {
      a.sdkCall = entitiesMetaData['reasonLists'].entityApiRequest('update', 'singleMainEntity');

      a.values.active = getSelectedEntity(store.getState()).get('active');

      a.sdkCall.data = {
        ...a.values,
        reasonListId: a.entityId,
        reasons: a.values.reasons.map(({ reasonId, sortOrder, hierarchy }) => ({
          reasonId,
          sortOrder,
          hierarchy
        }))
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('reasonLists')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const getReasonsAfterFetchingReasonsLists = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'reasonLists')
    .map(() => ({ type: 'FETCH_DATA', entityName: 'reasons' }));

export const InitReasonListsForm = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'reasonLists')
    .map(a => {
      a.response.result.reasons = a.response.result.reasons
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .reduce((updatedReasons, currentReason) => {
          const categoryExists = updatedReasons.find(value => value.hierarchy[0] === currentReason.hierarchy[0]);
          if (!categoryExists) {
            updatedReasons.push({
              ...currentReason,
              droppableUUID: generateUUID(),
              categoryUUID: generateUUID(),
              draggableUUID: generateUUID(),
              reasonUUID: generateUUID()
            });
            return updatedReasons;
          } else {
            updatedReasons.push({
              ...currentReason,
              draggableUUID: generateUUID(),
              reasonUUID: generateUUID(),
              categoryUUID: categoryExists.categoryUUID,
              droppableUUID: categoryExists.droppableUUID
            });
            return updatedReasons;
          }
        }, []);
      a.response.result = {
        name: a.response.result.name,
        externalId: a.response.result.externalId,
        description: a.response.result.description,
        reasons: a.response.result.reasons,
        shared: a.response.result.shared,
        isDefault: a.response.result.isDefault
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

export const ReasonListsSubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'reasonLists')
    .map(a => {
      if (a.entityId === 'create') {
        // Checking reasons with same hierarchy but different category uuid
        // Transfer List does not have this but needs one
        a.values = a.values.map(reason => {
          let firstOccur = a.values.find(first => reason.get('hierarchy')[0] === first.get('hierarchy')[0]);
          if (firstOccur && firstOccur.get('categoryUUID') !== reason.get('categoryUUID')) {
            reason = reason.set('categoryUUID', firstOccur.get('categoryUUID'));
          }
          return reason;
        });
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'reasons',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.values
        };
      } else {
        const reasons = a.values
          .map(reason =>
            reason
              .delete('draggableUUID')
              .delete('reasonUUID')
              .delete('droppableUUID')
              .delete('categoryUUID')
          )
          .toJS();
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          externalId: getCurrentFormValueByFieldName(store.getState(), 'externalId'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          shared: getCurrentFormValueByFieldName(store.getState(), 'shared'),
          isDefault: getCurrentFormValueByFieldName(store.getState(), 'isDefault'),
          reasons: reasons.map((reason, index) => {
            reason.sortOrder = index;
            return reason;
          })
        };
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: values
        };
      }
    });

export const ReInitReasonListsForm = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'reasonLists')
    .map(a => {
      a.values.reasons = a.response.result.reasons.reduce((updatedReasons, currentReason) => {
        const categoryExists = updatedReasons.find(value => value.hierarchy[0] === currentReason.hierarchy[0]);
        if (!categoryExists) {
          updatedReasons.push({
            ...currentReason,
            droppableUUID: generateUUID(),
            categoryUUID: generateUUID(),
            draggableUUID: generateUUID(),
            reasonUUID: generateUUID()
          });
          return updatedReasons;
        } else {
          updatedReasons.push({
            ...currentReason,
            draggableUUID: generateUUID(),
            reasonUUID: generateUUID(),
            categoryUUID: categoryExists.categoryUUID,
            droppableUUID: categoryExists.droppableUUID
          });
          return updatedReasons;
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

export const DeleteReasonListItem = (action$, store) =>
  action$
    .ofType('REMOVE_REASON_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entity: getSelectedEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId !== 'create')
    .map(a => {
      let updatedReasons;
      if (a.reasonListItemId) {
        updatedReasons = getCurrentFormValueByFieldName(store.getState(), 'reasons')
          .filter(reason => reason.get('reasonUUID') !== a.reasonListItemId)
          .map(reason =>
            reason
              .delete('reasonUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      } else if (a.categoryId) {
        updatedReasons = getCurrentFormValueByFieldName(store.getState(), 'reasons')
          .filter(reason => reason.get('categoryUUID') !== a.categoryId)
          .map(reason =>
            reason
              .delete('reasonUUID')
              .delete('draggableUUID')
              .delete('categoryUUID')
              .delete('droppableUUID')
          );
      }
      updatedReasons = updatedReasons.map((reason, index) => reason.set('sortOrder', index));
      return { ...a, updatedReasons };
    })
    .map(a => {
      if (a.updatedReasons && a.updatedReasons.size > 0) {
        return {
          type: 'UPDATE_ENTITY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState()),
          values: {
            name: a.entity.get('name'),
            externalId: a.entity.get('externalId'),
            description: a.entity.get('description'),
            reasons: a.updatedReasons.toJS(),
            shared: a.entity.get('shared'),
            isDefault: a.entity.get('isDefault')
          }
        };
      } else {
        return {
          type: 'REASON_LIST_CANNOT_BE_EMPTY',
          entityName: getCurrentEntity(store.getState()),
          entityId: getSelectedEntityId(store.getState())
        };
      }
    });

export const RemoveReasonListItem = (action$, store) =>
  action$
    .ofType('REMOVE_REASON_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.entityId === 'create')
    .map(a => {
      let updatedReasons;
      if (a.reasonListItemId) {
        updatedReasons = getCurrentFormValueByFieldName(store.getState(), 'reasons').filter(
          reason => reason.get('reasonUUID') !== a.reasonListItemId
        );
      } else if (a.categoryId) {
        updatedReasons = getCurrentFormValueByFieldName(store.getState(), 'reasons').filter(
          reason => reason.get('categoryUUID') !== a.categoryId
        );
      }
      return { ...a, updatedReasons };
    })
    .map(a => {
      if (a.updatedReasons && a.updatedReasons.size > 0) {
        return {
          type: '@@redux-form/CHANGE',
          entityName: a.entityName,
          entityId: a.entityId,
          meta: {
            form: `${a.entityName}:${a.entityId}`,
            field: 'reasons',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: a.updatedReasons
        };
      } else {
        const values = {
          name: getCurrentFormValueByFieldName(store.getState(), 'name'),
          description: getCurrentFormValueByFieldName(store.getState(), 'description'),
          externalId: getCurrentFormValueByFieldName(store.getState(), 'externalId'),
          shared: getCurrentFormValueByFieldName(store.getState(), 'shared'),
          isDefault: getCurrentFormValueByFieldName(store.getState(), 'isDefault'),
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
