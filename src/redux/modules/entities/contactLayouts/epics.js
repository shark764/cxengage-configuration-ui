/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { generateUUID } from 'serenova-js-utils/uuid';
import { List, fromJS } from 'immutable';

import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentFormValues } from '../../form/selectors';
import { getContactLayoutsFormSubmitValues } from './selectors';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntity, isEntityFetching } from '../selectors';
import { getContactAttributes, getMandatoryContactAttributes } from '../contactAttributes/selectors';

export const getAttributesAfterFetchingContactLayouts = action$ =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(a => a.entityName === 'contactLayouts')
    .map(() => ({ type: 'FETCH_DATA', entityName: 'contactAttributes' }));

export const InitContactLayoutsForm = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID', 'FETCH_DATA_FULFILLED')
    .map(a => ({
      ...a,
      selectedEntity: getSelectedEntity(store.getState()),
      isEntityFetching: isEntityFetching(store.getState()),
      currentEntityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      mandatoryContactAttributes: getMandatoryContactAttributes(store.getState()),
      contactAttributes: getContactAttributes(store.getState()) ? getContactAttributes(store.getState()) : List(),
      currentFormValues: getCurrentFormValues(store.getState()) ? getCurrentFormValues(store.getState()).toJS() : {}
    }))
    .filter(
      a =>
        !a.isEntityFetching &&
        a.currentEntityName === 'contactLayouts' &&
        a.selectedEntityId &&
        a.selectedEntityId !== '' &&
        a.selectedEntityId !== 'bulk'
    )
    .map(a => {
      if (a.entityId === 'create') {
        if (a.mandatoryContactAttributes && a.mandatoryContactAttributes.size > 0) {
          a.result = {
            layout: a.mandatoryContactAttributes.reduce(
              (acc, currentAttribute, idx) =>
                acc.push(
                  fromJS({
                    name: currentAttribute.get('objectName'),
                    hierarchy: 'Mandatory Attributes',
                    label: { name: 'Mandatory Attributes' },
                    contactAttributeId: currentAttribute.get('id'),
                    mandatory: true,
                    categoryUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'categoryUUID']),
                    droppableUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'droppableUUID']),
                    draggableUUID: generateUUID(),
                    endpointUUID: generateUUID()
                  })
                ),
              List()
            )
          };
        } else {
          a.result = { ...a.currentFormValues, layout: [] };
        }
      } else {
        a.result =
          a.selectedEntity &&
          a.selectedEntity.update('layout', layout =>
            layout.reduce((accumlator, currentLayout) => {
              const updatedAttributes = currentLayout
                .get('attributes')
                .map(attributeId => a.contactAttributes.find(attribute => attribute.get('id') === attributeId))
                .reduce(
                  (acc, currentAttribute, idx) =>
                    acc.push(
                      fromJS({
                        name: currentAttribute.get('objectName'),
                        hierarchy: currentLayout.getIn(['label', 'name']) || currentLayout.getIn(['label', 'en-US']),
                        label: currentLayout.get('label'),
                        contactAttributeId: currentAttribute.get('id'),
                        mandatory: currentAttribute.get('mandatory'),
                        categoryUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'categoryUUID']),
                        droppableUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'droppableUUID']),
                        draggableUUID: generateUUID(),
                        endpointUUID: generateUUID()
                      })
                    ),
                  List()
                );
              return accumlator.concat(updatedAttributes);
            }, List())
          );
      }
      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${getCurrentEntity(store.getState())}:${getSelectedEntityId(store.getState())}`
      },
      payload: a.result
    }));

export const ContactLayoutsSubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'contactLayouts')
    .map(a => {
      return {
        type: '@@redux-form/CHANGE',
        entityName: a.entityName,
        entityId: a.entityId,
        meta: {
          form: `${a.entityName}:${a.entityId}`,
          field: 'layout',
          touch: false,
          persistentSubmitErrors: false
        },
        payload: a.values.get('layout')
      };
    });

export const ContactLayoutsFormSubmission = (action$, store) =>
  action$
    .ofType('FORM_SUBMIT')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'contactLayouts')
    .map(a => {
      if (a.entityId === 'create') {
        return {
          type: 'CREATE_ENTITY',
          entityName: a.entityName,
          values: a.values.toJS()
        };
      } else {
        return {
          type: 'UPDATE_ENTITY',
          entityName: a.entityName,
          entityId: a.entityId,
          values: a.values.toJS()
        };
      }
    });

export const UpdateContactLayoutsList = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'contactLayouts')
    .map(a => {
      a.sdkCall = entitiesMetaData['contactLayouts'].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = a.values;
      a.sdkCall.path = ['contacts/layouts', getSelectedEntityId(store.getState())];
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `Contact Layout was updated successfully!`))
        .catch(error => handleError(error, a))
    );

export const ReInitContactLayoutsForm = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'contactLayouts')
    .map(a => ({
      ...a,
      contactAttributes: getContactAttributes(store.getState()) ? getContactAttributes(store.getState()) : List()
    }))
    .map(a => {
      a.response.result = fromJS(a.response.result).update('layout', layout =>
        layout.reduce((accumlator, currentLayout) => {
          const updatedAttributes = currentLayout
            .get('attributes')
            .map(attributeId => a.contactAttributes.find(attribute => attribute.get('id') === attributeId))
            .reduce(
              (acc, currentAttribute, idx) =>
                acc.push(
                  fromJS({
                    name: currentAttribute.get('objectName'),
                    hierarchy: currentLayout.getIn(['label', 'name']) || currentLayout.getIn(['label', 'en-US']),
                    label: currentLayout.get('label'),
                    contactAttributeId: currentAttribute.get('id'),
                    mandatory: currentAttribute.get('mandatory'),
                    categoryUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'categoryUUID']),
                    droppableUUID: idx === 0 ? generateUUID() : acc.getIn([0, 'droppableUUID']),
                    draggableUUID: generateUUID(),
                    endpointUUID: generateUUID()
                  })
                ),
              List()
            );
          return accumlator.concat(updatedAttributes);
        }, List())
      );
      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`
      },
      payload: a.response.result
    }));

export const RemoveContactLayoutsListItem = (action$, store) =>
  action$
    .ofType('REMOVE_CONTACT_LAYOUTS_LIST_ITEM')
    .debounceTime(300)
    .map(action => ({
      ...action,
      entityId: getSelectedEntityId(store.getState()),
      entityName: getCurrentEntity(store.getState()),
      values: getCurrentFormValues(store.getState()),
      removingItemId: action.contactLayoutsListItemId || action.categoryId,
      removingItemType: action.contactLayoutsListItemId ? 'endpointUUID' : 'categoryUUID'
    }))
    .map(a => ({
      ...a,
      values: a.values.update('layout', layout =>
        layout.filter(layout => layout.get(a.removingItemType) !== a.removingItemId)
      )
    }))
    .map(a => ({
      type: '@@redux-form/CHANGE',
      entityName: a.entityName,
      entityId: a.entityId,
      meta: {
        form: `${a.entityName}:${a.entityId}`,
        field: 'layout',
        touch: false,
        persistentSubmitErrors: false
      },
      payload: a.values.get('layout')
    }));

export const ToggleContactLayoutItem = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY')
    .filter(() => getCurrentEntity(store.getState()) === 'contactLayouts')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      values: getContactLayoutsFormSubmitValues(store.getState())
        ? getContactLayoutsFormSubmitValues(store.getState()).toJS()
        : {}
    }))
    .map(a => {
      a.sdkCall = entitiesMetaData['contactLayouts'].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.data = { ...a.values, active: !a.values.active };
      a.sdkCall.path = ['contacts/layouts', a.entityId];
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `Contact Layout was ${response.result.active === true ? 'enabled' : 'disabled'} successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

// After an entity is enabled/disabled, backend disables rest of the other contact-layouts (so we need to refeesh the entiy table after toggling)
export const FetchContactLayoutsAfterToggle = action$ =>
  action$
    .ofType('TOGGLE_ENTITY_FULFILLED')
    .filter(({ entityName }) => entityName === 'contactLayouts')
    .map(() => ({ type: 'FETCH_DATA', entityName: 'contactLayouts' }));
