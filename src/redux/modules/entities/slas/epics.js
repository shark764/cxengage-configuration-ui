/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentEntity, getSelectedEntityId, findEntity } from '../selectors';
import { clearFields } from 'redux-form';
import { getCurrentTenantId } from '../../userData/selectors';

export const ClearAbandonThresholdFormField = action$ =>
  action$
    .ofType('@@redux-form/UNREGISTER_FIELD')
    .filter(a => a.meta.form.includes('slas') || a.meta.form === 'initialSlaVersion:create')
    .filter(a =>
      ['versionName', 'versionDescription', 'abandonType', 'slaThreshold', 'abandonThreshold'].includes(a.payload.name)
    )
    .map(a => clearFields(a.meta.form, false, false, a.payload.name));

export const CreateSlaVersionFormSubmission = (action$, store) =>
  action$
    .ofType('INITIAL_VERSION_FORM_SUBMIT')
    .debounceTime(300)
    .filter(({ dirty }) => dirty)
    .map(a => {
      a.entityId = getSelectedEntityId(store.getState());
      a.entityName = getCurrentEntity(store.getState());
      a.values = {
        ...a.values.toJS(),
        description: a.values.get('versionDescription')
      };

      a.sdkCall = {
        command: 'createSlaVersion',
        data: {},
        module: 'entities',
        topic: 'cxengage/entities/create-sla-version-response'
      };
      a.sdkCall.data = {
        ...a.values,
        slaId: a.entityId
      };

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `A new version for this SLA was created successfully!`))
        .catch(error => handleError(error, a))
    );

export const CreateSlaVersionFullfilled = (action$, store) =>
  action$.ofType('INITIAL_VERSION_FORM_SUBMIT_FULFILLED').map(a => ({
    type: 'SET_SELECTED_ENTITY_ID',
    entityId: a.response.result.slaId || getSelectedEntityId(store.getState())
  }));

export const FetchTenant = (action$, store) =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'slas')
    .map(a => ({
      ...a,
      entityName: 'tenants',
      currentTenantId: getCurrentTenantId(store.getState())
    }))
    .filter(a => !findEntity(store.getState(), a.entityName, a.currentTenantId))
    .map(a => {
      a.sdkCall = {
        command: 'getTenant',
        data: {
          tenantId: a.currentTenantId || a.response.result.tenantId
        },
        module: 'entities',
        topic: 'cxengage/entities/get-tenant-response'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => ({
          ...a,
          response,
          type: 'FETCH_TENANT_DEFAULT_SLA'
        }))
        .catch(error => handleError(error, a))
    );

export const ReInitForm = action$ =>
  action$
    .ofType('FETCH_DATA_ITEM_FULFILLED')
    .filter(a => a.entityName === 'slas')
    // Used to re-initialize SLA form after the version
    // is created. Is the easiest way to update the whole form
    .map(a => {
      delete a.response.result.active;
      delete a.response.result.versions;
      return a;
    })
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.id}`
      },
      payload: { ...a.response.result }
    }));
