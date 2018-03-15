import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { sdkPromise } from '../../../utils/sdk';
import {
  capitalizeFirstLetter,
  removeLastLetter,
  camelCaseToKebabCase
} from '../../../utils/string';

import {
  submitForm,
  getCurrentEntity,
  getSelectedEntityId,
  getAllEntities,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedSubEntityId
} from '../crudEndpoint.js';

import { createFormMetadata, updateFormMetadata } from '../formMetadata';

export const StartFormSubmission = (action$, store) =>
  action$
    .ofType('START_FORM_SUBMISSION')
    .map(() =>
      submitForm(
        `${getCurrentEntity(store.getState())}:${getSelectedEntityId(
          store.getState()
        )}`
      )
    );

export const FormSubmission = (action$, store) =>
  action$.ofType('FORM_SUBMIT').mergeMap(({ values, dirty }) => {
    if (dirty) {
      const currentEntity = getCurrentEntity(store.getState());
      const selectedEntityId = getSelectedEntityId(store.getState());
      if (selectedEntityId === 'create') {
        return of({
          type: 'CREATE_ENTITY',
          entityName: currentEntity,
          values: values.toJS()
        });
      } else {
        return of({
          type: 'UPDATE_ENTITY',
          entityName: currentEntity,
          entityId: selectedEntityId,
          values: values.toJS()
        });
      }
    }
  });

export const FetchData = (action$, store) =>
  action$.ofType('FETCH_DATA').switchMap(({ entityName }) =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `get${capitalizeFirstLetter(entityName)}`,
          data: {}
        },
        `cxengage/entities/get-${camelCaseToKebabCase(entityName)}-response`
      )
    )
      .mergeMap(response =>
        of({
          type: 'FETCH_DATA_FULFILLED',
          entityName,
          response
        })
      )
      .catch(error =>
        of({
          type: 'FETCH_DATA_REJECTED',
          entityName,
          error
        })
      )
  );

export const CreateEntity = (action$, store) =>
  action$.ofType('CREATE_ENTITY').mergeMap(({ entityName, values }) =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `create${capitalizeFirstLetter(
            removeLastLetter(entityName)
          )}`,
          data: values
        },
        `cxengage/entities/create-${removeLastLetter(entityName)}-response`
      )
    )
      .mergeMap(response =>
        of({
          type: 'CREATE_ENTITY_FULFILLED',
          entityName,
          response
        })
      )
      .catch(error =>
        of({
          type: 'CREATE_ENTITY_REJECTED',
          entityName,
          error
        })
      )
  );

const updateEntityFulfilled = (entityName, payload) => ({
  type: 'UPDATE_ENTITY_FULFILLED',
  entityName,
  payload
});

export const UpdateEntity = (action$, store) =>
  action$.ofType('UPDATE_ENTITY').mergeMap(({ entityName, entityId, values }) =>
    fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `update${capitalizeFirstLetter(
            removeLastLetter(entityName)
          )}`,
          data: Object.assign(values, {
            [`${removeLastLetter(entityName)}Id`]: entityId
          })
        },
        `cxengage/entities/update-${removeLastLetter(entityName)}-response`
      )
    )
      .map(response => updateEntityFulfilled(entityName, response))
      .catch(error =>
        of({
          type: 'UPDATE_ENTITY_REJECTED',
          entityName,
          error
        })
      )
  );

export const ToggleEntity = (action$, store) =>
  action$.ofType('TOGGLE_ENTITY').mergeMap(action => {
    const currentEntity = getCurrentEntity(store.getState());
    const selectedEntityId = getSelectedEntityId(store.getState());
    const selectedEntity = getAllEntities(store.getState()).find(
      entity => entity.get('id') === selectedEntityId
    );
    return fromPromise(
      sdkPromise(
        {
          module: 'entities',
          command: `update${capitalizeFirstLetter(
            removeLastLetter(currentEntity)
          )}`,
          data: {
            [`${removeLastLetter(currentEntity)}Id`]: selectedEntityId,
            active: !selectedEntity.get('active')
          }
        },
        `cxengage/entities/update-${removeLastLetter(currentEntity)}-response`
      )
    )
      .map(response => updateEntityFulfilled(currentEntity, response))
      .catch(error =>
        of({
          type: 'TOGGLE_ENTITY_REJECTED',
          error
        })
      );
  });

export const FetchFormMetaData = (action$, store) =>
  action$.ofType('SET_SELECTED_ENTITY_ID').mergeMap(() => {
    const currentEntityName = getCurrentEntity(store.getState());
    const entityId = getSelectedEntityId(store.getState());

    if (entityId === 'create') {
      return from(createFormMetadata[currentEntityName] || []).map(
        entityName =>
          store.getState().getIn(['crudEndpoint', entityName, 'data']) ===
            undefined && { type: 'FETCH_DATA', entityName }
      );
    } else {
      return from(updateFormMetadata[currentEntityName] || []).map(
        entityName =>
          store.getState().getIn(['crudEndpoint', entityName, 'data']) ===
            undefined && { type: 'FETCH_DATA', entityName }
      );
    }
  });

export const SubEntityFormSubmission = (action$, store) =>
  action$.ofType('SUB_ENTITY_FORM_SUBMIT').mergeMap(({ values, dirty }) => {
    if (dirty) {
      const entityName = getCurrentEntity(store.getState());
      const selectedEntity = getSelectedEntity(store.getState());
      const subEntityName = getCurrentSubEntity(store.getState());
      const selectedSubEntityId = getSelectedSubEntityId(store.getState());
      if (selectedSubEntityId === 'create') {
        return of({
          type: 'CREATE_SUB_ENTITY',
          entityName,
          selectedEntity,
          subEntityName,
          values: values.toJS()
        });
      } else if (selectedSubEntityId) {
        // TODO update case
      } else {
        console.warn(
          'Tried to submit sub entity form without selected sub entity'
        );
      }
    }
  });

export const CreateSubEntity = (action$, store) =>
  action$
    .ofType('CREATE_SUB_ENTITY')
    .mergeMap(({ entityName, selectedEntity, subEntityName, values }) => {
      const singularSubEntityName = removeLastLetter(subEntityName);
      return fromPromise(
        sdkPromise(
          {
            module: 'entities',
            command: `create${capitalizeFirstLetter(singularSubEntityName)}`,
            data: listItemData(selectedEntity, values)
          },
          `cxengage/entities/create-${camelCaseToKebabCase(
            singularSubEntityName
          )}-response`
        )
      )
        .mergeMap(response =>
          of({
            type: 'CREATE_SUB_ENTITY_FULFILLED',
            entityName,
            entityId: selectedEntity.get('id'),
            subEntityName,
            response
          })
        )
        .catch(error =>
          of({
            type: 'CREATE_SUB_ENTITY_REJECTED',
            entityName,
            entityId: selectedEntity.get('id'),
            subEntityName,
            error
          })
        );
    });

function listItemData(list, values) {
  // Convert number and boolean strings to actual numbers and booleans
  const fields = list.getIn(['listType', 'fields']);
  Object.keys(values).forEach(valueName => {
    const fieldType = fields
      .find(field => field.get('name') === valueName)
      .get('type');
    if (fieldType === 'number') {
      values[valueName] = Number(values[valueName]);
    } else if (fieldType === 'boolean') {
      values[valueName] = values[valueName] === true;
    }
  });
  return {
    listId: list.get('id'),
    itemValue: values
  };
}
