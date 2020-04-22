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
