/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { Toast } from 'cx-ui-components';

import * as MODALS from '../../../containers/ConfirmationDialog/constants.js';

import { sdkPromise, errorLabel } from '../../../utils/sdk';
import {
  capitalizeFirstLetter,
  removeLastLetter,
  camelCaseToKebabCase,
  camelCaseToRegularForm,
  camelCaseToRegularFormAndRemoveLastLetter,
  capitalizeFirstAndRemoveLastLetter
} from '../../../utils/string';

import { updateEntityFulfilled } from './index';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getAllEntities,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedSubEntityId,
  getConfirmationDialogType
} from './selectors';

import {
  createFormMetadata,
  updateFormMetadata
} from '../../../utils/formMetaData';

export const StartFormSubmission = (action$, store) =>
  action$
    .ofType('START_FORM_SUBMISSION')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      selectedIdentityId: getSelectedEntityId(store.getState())
    }))
    .map(a => ({
      type: '@@redux-form/SUBMIT',
      meta: { form: `${a.currentEntity}:${a.selectedIdentityId}` }
    }));

export const reInitForm = (action$, store) =>
  action$.ofType('UPDATE_ENTITY_FULFILLED').map(a => ({
    type: '@@redux-form/INITIALIZE',
    meta: {
      form: `${a.entityName}:${a.entityId}`
    },
    payload: { name: a.payload.name }
  }));

export const FormSubmission = (action$, store) =>
  action$
    .ofType('FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .map(
      a =>
        a.selectedEntityId === 'create'
          ? {
              type: 'CREATE_ENTITY',
              entityName: a.currentEntity,
              values: a.values.toJS()
            }
          : {
              type: 'UPDATE_ENTITY',
              entityName: a.currentEntity,
              entityId: a.selectedEntityId,
              values: a.values.toJS()
            }
    );

export const FetchData = (action$, store) =>
  action$.ofType('FETCH_DATA').switchMap(a =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `get${capitalizeFirstLetter(a.entityName)}`,
          data: {}
        },
        `cxengage/entities/get-${camelCaseToKebabCase(a.entityName)}-response`
      )
    )
      .map(response => ({
        type: 'FETCH_DATA_FULFILLED',
        entityName: a.entityName,
        response: response
      }))
      .catch(error => {
        Toast.error(errorLabel(error));
        return of({
          type: 'FETCH_DATA_REJECTED',
          entityName: a.entityName,
          error: error
        });
      })
  );

export const getTenantPermissions = (action$, store) =>
  action$.ofType('SET_CURRENT_ENTITY').switchMap(action =>
    fromPromise(
      sdkPromise(
        {
          module: 'updateLocalStorage',
          command: `updateLocalStorage`,
          data: 'updateLocalStorage'
        },
        `updateLocalStorage`
      )
    ).map(response => ({
      type: 'UPDATE_USER_PERMISSIONS',
      tenantInfo: {
        tenantId: response.tenantId,
        tenantName: response.tenantName,
        tenantPermissions: response.tenantPermissions
      }
    }))
  );

export const CreateEntity = (action$, store) =>
  action$.ofType('CREATE_ENTITY').mergeMap(a =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `create${capitalizeFirstAndRemoveLastLetter(a.entityName)}`,
          data: a.values
        },
        `cxengage/entities/create-${removeLastLetter(a.entityName)}-response`
      )
    )
      .map(response => {
        Toast.success(
          `${camelCaseToRegularFormAndRemoveLastLetter(
            a.entityName
          )} was created successfully!`
        );
        return {
          type: 'CREATE_ENTITY_FULFILLED',
          entityName: a.entityName,
          response: response
        };
      })
      .catch(error => {
        Toast.error(errorLabel(error));
        return {
          type: 'CREATE_ENTITY_REJECTED',
          entityName: a.entityName,
          error: error
        };
      })
  );
export const UpdateEntity = (action$, store) =>
  action$.ofType('UPDATE_ENTITY').mergeMap(a =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `update${capitalizeFirstLetter(
            removeLastLetter(a.entityName)
          )}`,
          data: {
            ...a.values,
            [`${removeLastLetter(a.entityName)}Id`]: a.entityId
          }
        },
        `cxengage/entities/update-${removeLastLetter(a.entityName)}-response`
      )
    )
      .map(response => {
        Toast.success(
          `${camelCaseToRegularFormAndRemoveLastLetter(
            a.entityName
          )} was updated successfully!`
        );
        return updateEntityFulfilled(a.entityName, response, a.entityId);
      })
      .catch(error => {
        Toast.error(errorLabel(error));
        return of({
          type: 'UPDATE_ENTITY_REJECTED',
          entityName: a.entityName,
          entityId: a.entityId,
          error: error
        });
      })
  );

export const ToggleEntity = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      get selectedEntity() {
        return getAllEntities(store.getState()).find(
          entity => entity.get('id') === this.selectedEntityId
        );
      }
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `update${capitalizeFirstAndRemoveLastLetter(
              a.currentEntity
            )}`,
            data: {
              [`${removeLastLetter(a.currentEntity)}Id`]: a.selectedEntityId,
              active: !a.selectedEntity.get('active')
            }
          },
          `cxengage/entities/update-${removeLastLetter(
            a.currentEntity
          )}-response`
        )
      )
        .map(response => {
          Toast.success(
            `${camelCaseToRegularFormAndRemoveLastLetter(
              a.currentEntity
            )} was ${
              a.selectedEntity.get('active') ? 'disabled' : 'enabled'
            } successfully!`
          );
          return updateEntityFulfilled(a.currentEntity, response);
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'TOGGLE_ENTITY_REJECTED',
            error: error
          });
        })
    );

export const FetchFormMetaData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      currentEntityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      isDefined: name =>
        store.getState().getIn(['crudEndpoint', name, 'data']) === undefined
    }))
    .mergeMap(
      a =>
        a.entityId === 'create'
          ? from(createFormMetadata[a.currentEntityName] || [])
              .filter(entityName => a.isDefined(entityName))
              .map(entityName => ({ type: 'FETCH_DATA', entityName }))
          : from(updateFormMetadata[a.currentEntityName] || [])
              .filter(entityName => a.isDefined(entityName))
              .map(entityName => ({ type: 'FETCH_DATA', entityName }))
    );

export const SubEntityFormSubmission = (action$, store) =>
  action$
    .ofType('SUB_ENTITY_FORM_SUBMIT')
    .filter(({ dirty }) => dirty)
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntity: getSelectedEntity(store.getState()),
      subEntityName: getCurrentSubEntity(store.getState()),
      selectedSubEntityId: getSelectedSubEntityId(store.getState())
    }))
    .filter(({ selectedSubEntityId }) => selectedSubEntityId)
    .map(
      a =>
        a.selectedSubEntityId === 'create'
          ? {
              type: 'CREATE_SUB_ENTITY',
              entityName: a.entityName,
              selectedEntity: a.selectedEntity,
              subEntityName: a.subEntityName,
              values: a.values.toJS()
            }
          : {
              type: 'UPDATE_SUB_ENTITY',
              entityName: a.entityName,
              selectedEntity: a.selectedEntity,
              subEntityName: a.subEntityName,
              values: a.values.toJS()
            }
    );

export const CreateSubEntity = (action$, store) =>
  action$
    .ofType('CREATE_SUB_ENTITY')
    .map(action => ({
      ...action,
      singularSubEntityName: removeLastLetter(action.subEntityName)
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `create${capitalizeFirstLetter(a.singularSubEntityName)}`,
            data: {
              [`${removeLastLetter(a.entityName)}Id`]: a.selectedEntity.get(
                'id'
              ),
              itemValue: a.values
            }
          },
          `cxengage/entities/create-${camelCaseToKebabCase(
            a.singularSubEntityName
          )}-response`
        )
      )
        .map(response => {
          Toast.success(
            `${camelCaseToRegularForm(
              a.singularSubEntityName
            )} was created successfully!`
          );
          return {
            type: 'CREATE_SUB_ENTITY_FULFILLED',
            entityName: a.entityName,
            entityId: a.selectedEntity.get('id'),
            subEntityName: a.subEntityName,
            response: response
          };
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'CREATE_SUB_ENTITY_REJECTED',
            entityName: a.entityName,
            entityId: a.selectedEntity.get('id'),
            subEntityName: a.subEntityName,
            error: error
          });
        })
    );

export const UpdateSubEntity = (action$, store) =>
  action$
    .ofType('UPDATE_SUB_ENTITY')
    .map(action => ({
      ...action,
      singularSubEntityName: removeLastLetter(action.subEntityName),
      subEntityId: getSelectedSubEntityId(store.getState())
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `update${capitalizeFirstLetter(a.singularSubEntityName)}`,
            data: {
              listId: a.selectedEntity.get('id'),
              listItemKey: a.subEntityId,
              itemValue: a.values
            }
          },
          `cxengage/entities/update-${camelCaseToKebabCase(
            a.singularSubEntityName
          )}-response`
        )
      )
        .map(response => {
          Toast.success(
            `${camelCaseToRegularForm(
              a.singularSubEntityName
            )} was updated successfully!`
          );
          return {
            type: 'UPDATE_SUB_ENTITY_FULFILLED',
            entityName: a.entityName,
            entityId: a.selectedEntity.get('id'),
            subEntityName: a.subEntityName,
            subEntityId: a.subEntityId,
            response: response
          };
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'UPDATE_SUB_ENTITY_REJECTED',
            entityName: a.entityName,
            entityId: a.selectedEntity.get('id'),
            subEntityName: a.subEntityName,
            subEntityId: a.subEntityId,
            error
          });
        })
    );

export const DeleteSubEntity = (action$, store) =>
  action$.ofType('DELETE_SUB_ENTITY').mergeMap(({ subEntityId }) => {
    const entityName = getCurrentEntity(store.getState());
    const selectedEntity = getSelectedEntity(store.getState());
    const subEntityName = getCurrentSubEntity(store.getState());
    const singularSubEntityName = removeLastLetter(subEntityName);
    return fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `delete${capitalizeFirstLetter(singularSubEntityName)}`,
          data: {
            listId: selectedEntity.get('id'),
            listItemKey: subEntityId
          }
        },
        `cxengage/entities/delete-${camelCaseToKebabCase(
          singularSubEntityName
        )}-response`
      )
    )
      .map(response => {
        Toast.success(
          `${camelCaseToRegularForm(
            singularSubEntityName
          )} was deleted successfully!`
        );
        return {
          type: 'DELETE_SUB_ENTITY_FULFILLED',
          entityName,
          entityId: selectedEntity.get('id'),
          subEntityName,
          subEntityId,
          response
        };
      })
      .catch(error => {
        Toast.error(errorLabel(error));
        return of({
          type: 'DELETE_SUB_ENTITY_REJECTED',
          entityName,
          entityId: selectedEntity.get('id'),
          subEntityName,
          subEntityId,
          error
        });
      });
  });

export const ExecuteConfirmationDialogCallback = (action$, store) =>
  action$.ofType('EXECUTE_CONFIRM_CALLBACK').switchMap(action => {
    const currentConfirmationModal = getConfirmationDialogType(
      store.getState()
    );
    switch (currentConfirmationModal) {
      case MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE:
        return [
          {
            type: 'TOGGLE_ENTITY'
          },
          {
            type: 'SET_CONIFIRMATION_DIALOG',
            modalType: undefined
          }
        ];
      default:
        return {}; // nothing necessary to do here
    }
  });
