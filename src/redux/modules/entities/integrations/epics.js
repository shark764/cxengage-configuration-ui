/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getSelectedEntityId, getSelectedSubEntityId } from '../selectors';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter, camelCaseToKebabCase } from 'serenova-js-utils/strings';

export const FetchData = (action$, store) =>
  action$
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'integrations')
    .mergeMap(a =>
      fromPromise(sdkPromise(entitiesMetaData[a.entityName].entityApiRequest('get', 'mainEntity')))
        .map(response =>
          handleSuccess({ result: response.result.filter(integration => integration.type !== 'plivo') }, a)
        )
        .catch(error => handleError(error, a))
    );

export const CreateEntity = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'integrations')
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.path = entitiesMetaData[a.entityName].sdkCall.path
        ? entitiesMetaData[a.entityName].sdkCall.path
        : [camelCaseToKebabCase(a.entityName.replace(/[V|v]\d{1}/, ''))];
      a.sdkCall.data = { ...a.values, 'integration-type': a.values.type };
      a.sdkCall.apiVersion = entitiesMetaData[a.entityName].sdkCall.apiVersion;
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter(a.entityName)} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const CreateIntegrationListenerFormSubmission = (action$, store) =>
  action$
    .ofType('INTEGRATION_LISTENER_FORM_SUBMIT')
    .debounceTime(300)
    .filter(({ dirty }) => dirty)
    .map(a => {
      a.subEntityId = getSelectedSubEntityId(store.getState());
      a.entityId = getSelectedEntityId(store.getState());
      a.entityName = 'integrations';

      a.sdkCall = {
        command: a.subEntityId === 'listeners' ? 'createIntegrationListener' : 'updateIntegrationListener',
        data: {
          ...a.values.toJS(),
          integrationId: a.entityId,
          listenerId: a.subEntityId
        },
        module: 'entities',
        topic: 'cxengage/entities/create-integration-listener-response'
      };

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `A new listener for this Integration was created successfully!`))
        .catch(error => handleError(error, a))
    );
