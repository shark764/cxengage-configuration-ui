import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { selectFacebookIntegrationsFormInitialValues } from '../../entities/facebookIntegrations/selectors';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId } from '../selectors';

export const FetchSidePanelFacebookIntegrationData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'facebookIntegrations')
    .map(a => ({
      sdkCall: {
        path: ['facebook-integrations', a.id],
        module: 'api',
        crudAction: 'read',
        topic: 'cxengage/entities/get-facebook-integration-response'
      },
      ...a
    }))
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => {
          return handleSuccess(response, a);
        })
        .catch(error => handleError(error, a))
    );

export const FetchSidePanelFacebookIntegrationDataFulfilled = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'facebookIntegrations')
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `facebookIntegrations:${a.id}`,
        keepDirty: false,
        updateUnregisteredFields: false
      },
      payload: selectFacebookIntegrationsFormInitialValues(store.getState())
    }));
