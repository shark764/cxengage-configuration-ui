/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { Toast } from 'cx-ui-components';

import * as MODALS from '../../../containers/ConfirmationDialog/constants.js';

import { isIgnoredError } from './errors';
import { sdkPromise, errorLabel } from '../../../utils/sdk';
import {
  capitalizeFirstLetter,
  removeLastLetter,
  camelCaseToKebabCase,
  camelCaseToRegularForm,
  camelCaseToRegularFormAndRemoveLastLetter,
  camelCaseToKebabCaseAndRemoveLastLetter,
  capitalizeFirstAndRemoveLastLetter
} from '../../../utils/string';

import {
  fetchDataFulfilled,
  fetchDataRejected,
  updateEntityFulfilled,
  updateListItemFufilled,
  uploadCsv,
  setEntityUpdating,
  removeListItemFufilled,
  addListItemFufilled
} from './index';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getAllEntities,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedSubEntityId,
  getListDependency,
  getConfirmationDialogType,
  getConfirmationDialogMetaData,
  getSelectedEntityName
} from './selectors';

import {
  createFormMetadata,
  updateFormMetadata
} from '../../../utils/formMetaData';

import { hasCustomUpdateEntity } from './config';

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
    payload: { ...a.values }
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
  action$.ofType('FETCH_DATA').mergeMap(a =>
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
      .map(response => fetchDataFulfilled(a.entityName, response, a.tableType))
      .catch(error => {
        if (!isIgnoredError('FETCH_DATA', a.entityName)) {
          Toast.error(errorLabel(error));
        }
        return of(fetchDataRejected(a.entityName));
      })
  );

export const FetchDataItem = (action$, store) =>
  action$
    .ofType('FETCH_DATA_ITEM')
    .debounceTime(300)
    .switchMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `get${capitalizeFirstLetter(
              removeLastLetter(a.entityName)
            )}`,
            data: {
              [removeLastLetter(a.entityName) + 'Id']: a.id
            }
          },
          `cxengage/entities/get-${camelCaseToKebabCase(
            removeLastLetter(a.entityName)
          )}-response`
        )
      )
        .map(response => ({
          type: 'FETCH_DATA_ITEM_FULFILLED',
          entityName: a.entityName,
          id: a.id,
          response: response
        }))
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'FETCH_DATA_ITEM_REJECTED',
            entityName: a.entityName,
            entityId: a.entityId,
            error: error
          });
        })
    );

export const getTenantPermissions = (action$, store) =>
  action$
    .ofType('SET_CURRENT_ENTITY', 'START_SUPERVISOR_TOOLBAR_$')
    .switchMap(action =>
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
          tenantId: response.tenant.tenantId,
          tenantName: response.tenant.tenantName,
          tenantPermissions: response.tenant.tenantPermissions
        },
        agentId: response.agentId
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
        `cxengage/entities/create-${camelCaseToKebabCaseAndRemoveLastLetter(
          a.entityName
        )}-response`
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
        return of({
          type: 'CREATE_ENTITY_REJECTED',
          entityName: a.entityName
        });
      })
  );

export const UpdateEntity = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => hasCustomUpdateEntity(entityName))
    .mergeMap(a =>
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
          `cxengage/entities/update-${camelCaseToKebabCaseAndRemoveLastLetter(
            a.entityName
          )}-response`
        )
      )
        .map(response => {
          Toast.success(
            `${camelCaseToRegularFormAndRemoveLastLetter(
              a.entityName
            )} was updated successfully!`
          );
          return updateEntityFulfilled(
            a.entityName,
            response,
            a.entityId,
            a.values
          );
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'UPDATE_ENTITY_REJECTED',
            entityName: a.entityName,
            entityId: a.entityId
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
          `cxengage/entities/update-${camelCaseToKebabCaseAndRemoveLastLetter(
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
            type: 'TOGGLE_ENTITY_REJECTED'
          });
        })
    );

export const ToggleEntityListItem = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY_LIST_ITEM')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      listDependency: getListDependency(store.getState())
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `update${capitalizeFirstAndRemoveLastLetter(
              a.listDependency
            )}`,
            data: {
              [`${removeLastLetter(a.listDependency)}Id`]: a.entity.id,
              active: !a.entity.active
            }
          },
          `cxengage/entities/update-${camelCaseToKebabCaseAndRemoveLastLetter(
            a.listDependency
          )}-response`
        )
      )
        .map(response => {
          return updateListItemFufilled(response);
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'TOGGLE_ENTITY_REJECTED'
          });
        })
    );

export const RemoveListItem = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      listDependency: getListDependency(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `remove${capitalizeFirstAndRemoveLastLetter(
              a.currentEntity
            )}Member`,
            data: {
              outboundIdentifierListId: a.listId,
              outboundIdentifierId: a.listItemId
            }
          },
          `cxengage/entities/remove-${camelCaseToKebabCaseAndRemoveLastLetter(
            a.currentEntity
          )}-member-response`
        )
      )
        .map(response => {
          return removeListItemFufilled(a.listItemId, a.listId);
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'REMOVE_LIST_ITEM_REJECTED'
          });
        })
    );

export const AddListItem = (action$, store) =>
  action$
    .ofType('ADD_LIST_ITEM')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      listDependency: getListDependency(store.getState()),
      listId: getSelectedEntityId(store.getState())
    }))
    .mergeMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `add${capitalizeFirstAndRemoveLastLetter(
              a.currentEntity
            )}Member`,
            data: {
              outboundIdentifierListId: a.listId,
              outboundIdentifierId: a.listItemId
            }
          },
          `cxengage/entities/add-${camelCaseToKebabCaseAndRemoveLastLetter(
            a.currentEntity
          )}-member-response`
        )
      )
        .map(response => {
          return addListItemFufilled(a.listItemId, a.listId);
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'ADD_LIST_ITEM_REJECTED'
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
        store.getState().getIn(['Entities', name, 'data']) === undefined
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

export const FetchSidePanelData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      currentEntityName: getCurrentEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      isDefined: name =>
        store.getState().getIn(['Entities', name, 'data']) !== undefined
    }))
    .filter(
      a =>
        a.entityId !== 'create' &&
        a.entityId !== '' &&
        a.currentEntityName === 'outboundIdentifierLists'
    )
    .map(a => ({
      type: 'FETCH_DATA_ITEM',
      entityName: a.currentEntityName,
      id: a.entityId
    }));

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
            subEntityName: a.subEntityName
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
            subEntityId: a.subEntityId
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
          subEntityId
        });
      });
  });

export const ExecuteConfirmationDialogCallback = (action$, store) =>
  action$.ofType('EXECUTE_CONFIRM_CALLBACK').switchMap(action => {
    const currentConfirmationModal = getConfirmationDialogType(
      store.getState()
    );
    const metaData = getConfirmationDialogMetaData(store.getState());
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
      case MODALS.CONFIRM_ENTITY_CSV_UPLOAD:
        return [
          uploadCsv(metaData),
          setEntityUpdating(
            getCurrentEntity(store.getState()),
            getSelectedEntityId(store.getState()),
            true
          ),
          {
            type: 'SET_CONIFIRMATION_DIALOG',
            modalType: undefined,
            metaData: undefined
          }
        ];
      default:
        console.log(`No epic callback found for: ${currentConfirmationModal}`);
        return {}; // nothing necessary to do here
    }
  });

export const UploadCsv = (action$, store) =>
  action$
    .ofType('UPLOAD_CSV')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .switchMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `upload${capitalizeFirstLetter(
              removeLastLetter(a.entityName)
            )}`,
            data: {
              [`${removeLastLetter(a.entityName)}Id`]: a.selectedEntityId,
              file: a.target
            }
          },
          `cxengage/entities/upload-${camelCaseToKebabCase(
            removeLastLetter(a.entityName)
          )}-response`
        )
      )
        .do(response => {
          if (response.result.totalItemsProcessed > 0) {
            Toast.success(`
              Items Created: ${response.result.itemsCreated}
              </br>
              Items Updated: ${response.result.itemsUpdated}
              </br>
              Items Deleted: ${response.result.itemsDeleted}
              </br>
              </br>
              Total Items Processed: ${response.result.totalItemsProcessed}
            `);
          }

          if (response.result.numberOfFailures > 0) {
            Toast.error(
              `Number of Failures: ${response.result.numberOfFailures}`
            );
          }
        })
        .map(response => {
          return {
            type: 'FETCH_DATA_ITEM',
            entityName: a.entityName,
            id: a.selectedEntityId
          };
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'UPLOAD_CSV_REJECTED',
            entityName: a.entityName,
            entityId: a.selectedEntityId,
            error: error
          });
        })
    );

export const DownloadCsv = (action$, store) =>
  action$
    .ofType('DOWNLOAD_CSV')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      selectedEntityName: getSelectedEntityName(store.getState())
    }))
    .switchMap(a =>
      fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `download${capitalizeFirstLetter(
              removeLastLetter(a.entityName)
            )}`,
            data: {
              [`${removeLastLetter(a.entityName)}Id`]: a.selectedEntityId
            }
          },
          `cxengage/entities/download-${camelCaseToKebabCase(
            removeLastLetter(a.entityName)
          )}-response`
        )
      )
        .map(response => {
          const aTag = document.createElement('a');
          const blob = new Blob([response], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          aTag.href = url;
          aTag.setAttribute('download', `${a.selectedEntityName}.csv`);
          var events = document.createEvent('MouseEvents');
          events.initEvent('click', false, true);
          aTag.dispatchEvent(events);

          Toast.info('CSV Download Started');
          return {
            type: 'DOWNLOAD_CSV_FULFILLED'
          };
        })
        .catch(error => {
          Toast.error(errorLabel(error));
          return of({
            type: 'DOWNLOAD_CSV_REJECTED',
            error: error
          });
        })
    );
