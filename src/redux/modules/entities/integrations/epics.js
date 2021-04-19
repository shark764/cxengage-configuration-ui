/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getSelectedEntityId, getSelectedSubEntityId, getCurrentEntity, getSelectedEntity } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter, camelCaseToKebabCase } from 'serenova-js-utils/strings';
import { prepareIntegrationProperties } from './utilities';

export const FetchData = (action$, store) =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'integrations')
    .mergeMap((a) =>
      fromPromise(sdkPromise(entitiesMetaData[a.entityName].entityApiRequest('get', 'mainEntity')))
        .map((response) =>
          handleSuccess(
            {
              result: response.result.filter(
                (integration) => integration.type !== 'plivo' && integration.type !== 'birst'
              ),
            },
            a
          )
        )
        .catch((error) => handleError(error, a))
    );

export const CreateEntity = (action$) =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'integrations')
    .map((a) => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.path = entitiesMetaData[a.entityName].sdkCall.path
        ? entitiesMetaData[a.entityName].sdkCall.path
        : [camelCaseToKebabCase(a.entityName.replace(/[V|v]\d{1}/, ''))];
      const properties = prepareIntegrationProperties(a.values.type, a.values.authType, a.values.properties);
      a.sdkCall.data = { ...a.values, 'integration-type': a.values.type, properties };
      a.sdkCall.apiVersion = entitiesMetaData[a.entityName].sdkCall.apiVersion;
      return { ...a };
    })
    .concatMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .map((response) =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was created successfully!`
          )
        )
        .catch((error) => handleError(error, a))
    );

export const UpdateEntity = (action$) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'integrations')
    .map((a) => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update', 'singleMainEntity');
      a.sdkCall.path = [camelCaseToKebabCase(a.entityName), a.entityId];
      a.sdkCall.apiVersion = entitiesMetaData[a.entityName].sdkCall.apiVersion;
      const properties = prepareIntegrationProperties(a.values.type, a.values.authType, a.values.properties);
      const { created, createdBy, updated, updatedBy, updating, bulkChangeItem, ...data } = a.values;
      a.sdkCall.data = {
        ...data,
        integrationId: a.entityId,
        properties,
      };
      return { ...a };
    })
    .concatMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .map((response) =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was updated successfully!`
          )
        )
        .catch((error) => handleError(error, a))
    );

export const CreateIntegrationListenerFormSubmission = (action$, store) =>
  action$
    .ofType('INTEGRATION_LISTENER_FORM_SUBMIT')
    .debounceTime(300)
    .filter(({ dirty }) => dirty)
    .map((a) => {
      a.subEntityId = getSelectedSubEntityId(store.getState());
      a.entityId = getSelectedEntityId(store.getState());
      a.entityName = 'integrations';

      a.sdkCall = {
        command: a.subEntityId === 'listeners' ? 'createIntegrationListener' : 'updateIntegrationListener',
        data: {
          ...a.values.toJS(),
          integrationId: a.entityId,
          listenerId: a.subEntityId,
        },
        module: 'entities',
        topic: 'cxengage/entities/create-integration-listener-response',
      };

      return { ...a };
    })
    .concatMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .map((response) =>
          handleSuccess(
            response,
            a,
            a.subEntityId === 'listeners'
              ? `A new listener for this Integration was created successfully!`
              : `<i>Listener</i> was updated successfully!`
          )
        )
        .catch((error) => handleError(error, a))
    );

export const RemoveTwilioGlobalDialParamFormSubmission = (action$, store) =>
  action$
    .ofType('REMOVE_TWILIO_GLOBAL_DIAL_PARAM')
    .map((a) => {
      a.entityName = getCurrentEntity(store.getState());
      a.entityId = getSelectedEntity(store.getState()).get('id');
      a.values = getSelectedEntity(store.getState()).toJS();
      if (a.values.properties.globalDialParams.hasOwnProperty(a.subEntityName)) {
        delete a.values.properties.globalDialParams[a.subEntityName];
      }
      return { ...a };
    })
    .map((a) => ({
      ...a,
      type: 'UPDATE_ENTITY',
    }));

export const ReInitBusinessHoursV2Form = (action$) =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter((a) => a.entityName === 'integrations')
    .map((a) => {
      const { authType, bulkChangeItem } = a.values;
      const result = { ...a.response.result, authType, bulkChangeItem };
      delete result.active;
      return { ...a, result };
    })
    .map((a) => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`,
        keepDirty: false,
        updateUnregisteredFields: false,
      },
      payload: { ...a.result },
    }));
