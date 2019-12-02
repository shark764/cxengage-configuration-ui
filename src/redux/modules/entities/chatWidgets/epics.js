import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { selectFormInitialValues } from '../../form/selectors';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId } from '../selectors';

export const FetchSidePanelChatWidgetData = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(action => ({
      ...action,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'chatWidgets')
    .map(a => ({
      sdkCall: {
        path: ['web-integrations', a.id],
        module: 'api',
        crudAction: 'read',
        topic: 'cxengage/entities/get-chat-widgets-response'
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

export const FetchSidePanelChatWidgetDataFulfilled = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'chatWidgets')
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `chatWidgets:${a.id}`,
        keepDirty: false,
        updateUnregisteredFields: false
      },
      payload: selectFormInitialValues(store.getState())
    }));
