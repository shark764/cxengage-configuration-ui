import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Toast } from 'cx-ui-components';
import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { isInIframe } from 'serenova-js-utils/browser';

import { userHasPermissions, getSelectedEntity } from '../selectors';
import { getCurrentFormValueByFieldName, getCurrentFormValues } from '../../../modules/form/selectors';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntityName } from '../../../modules/entities/selectors';
import {
  getBrandingImagesUrlPart,
  isLogoOrFaviconSelected,
  tenantsFormCreateValues,
  tenantsFormUpdateValues,
  getSelectedTenantBranding,
  tenantsPlatformPermissions,
  getCurrentFormBrandingStyles,
  selectTenantsFormInitialValues,
  isTenantBrandingImagesUploaded,
  isAllTenantsFormDependenciesFetched,
  getSelectedTenantBrandingStyles,
  isTenantsFetched
} from './selectors';

// Fetch's all the tenant's that the user belongs to:
export const fetchTenants = ($action, store) =>
  $action
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'tenants' && isTenantsFetched(store.getState()))
    .mergeMap(a => {
      if (userHasPermissions(store.getState(), tenantsPlatformPermissions)) {
        a.fetchAllTenants = true;
        return fromPromise(sdkPromise(entitiesMetaData['tenants'].entityApiRequest('get', 'mainEntity')))
          .map(response => handleSuccess(response, a))
          .catch(error => handleError(error, a));
      } else if (userHasPermissions(store.getState(), ['MANAGE_TENANT'])) {
        return fromPromise(
          sdkPromise({
            command: 'getEntity',
            module: 'entities',
            topic: 'cxengage/entities/get-tenant-response',
            data: {
              path: '',
              customTopic: 'cxengage/entities/get-tenant-response'
            }
          })
        )
          .map(response => ({
            ...a,
            type: 'FETCH_DATA_FULFILLED',
            response: {
              result: [response.result]
            }
          }))
          .catch(error => handleError(error, a));
      } else {
        return of({
          type: 'FETCH_DATA_FULFILLED',
          entityName: 'tenants',
          response: {
            result: []
          }
        });
      }
    });

// Fetch's tenant-dependentEntities, don't fetch platform level entities like regions & timezones if they are already fetched.
// Also after updating a tenant only fetch branding because it's the only dependent entity that gets changed.
export const StartFetchingTenantsFormDependencies = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(a => ({
      ...a,
      currentEntityName: getCurrentEntity(store.getState()),
      isDefined: name => store.getState().getIn(['Entities', name, 'data']).size === 0,
      isDependentEntityDefined: name =>
        name === 'branding' ? true : !getSelectedEntity(store.getState()).getIn(['dependentEntities', name, 'data']),
      isPlatformEntity: (entityName, entityId) =>
        entityName === 'regions' || entityName === 'timezones' || (entityName === 'users' && entityId === 'create')
    }))
    .filter(a => a.entityId !== '' && a.entityId !== 'bulk' && a.currentEntityName === 'tenants')
    .switchMap(
      ({ entityId, currentEntityName, isDefined, isDependentEntityDefined, isPlatformEntity, toastMessage }) =>
        entityId === 'create'
          ? from(entitiesMetaData[currentEntityName].createFormDependencies)
              .filter(entityName => isDefined(entityName))
              .map(entityName => ({
                type: 'FETCH_DATA',
                entityName,
                entityId,
                toastMessage,
                currentEntityName,
                fetchingDependencies: true,
                isPlatformEntity: isPlatformEntity(entityName, entityId)
              }))
          : from(entitiesMetaData[currentEntityName].updateFormDependencies)
              .filter(
                entityName =>
                  entityName === 'timezones' || entityName === 'regions'
                    ? isDefined(entityName)
                    : isDependentEntityDefined(entityName)
              )
              .map(entityName => ({
                type: 'FETCH_DATA',
                entityName,
                entityId,
                toastMessage,
                currentEntityName,
                fetchingDependencies: true,
                isPlatformEntity: isPlatformEntity(entityName, entityId)
              }))
    );

// Add currently selected tenantId in the request while fetching the non-platfrom-level dependent entities.
export const FetchTenantsFormDependencies = (action$, store) =>
  action$
    .ofType('FETCH_DATA')
    .filter(
      ({ currentEntityName, fetchingDependencies }) => currentEntityName === 'tenants' && fetchingDependencies === true
    )
    .map(a => {
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('get', 'mainEntity');
      if (!a.isPlatformEntity) {
        a.sdkCall.data = { tenantId: getSelectedEntityId(store.getState()) };
      }
      return a;
    })
    .mergeMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

// ReInitialize Tenants form after all the dependent entities are fetched:
export const ReInitTenantsForm = (action$, store) =>
  action$
    .ofType('FETCH_DATA_FULFILLED')
    .filter(
      ({ currentEntityName, fetchingDependencies }) =>
        currentEntityName === 'tenants' &&
        fetchingDependencies === true &&
        isAllTenantsFormDependenciesFetched(store.getState())
    )
    .map(a => ({
      ...a,
      entityId: getSelectedEntityId(store.getState()),
      branding: getSelectedTenantBranding(store.getState()) ? getSelectedTenantBranding(store.getState()).toJS() : {},
      selectedEntity: getSelectedEntity(store.getState()) ? getSelectedEntity(store.getState()).toJS() : {}
    }))
    .map(
      ({ currentEntityName, toastMessage, entityId, selectedEntity, branding, response }) =>
        entityId === 'create'
          ? {
              type: '@@redux-form/INITIALIZE',
              toastMessage,
              entityName: currentEntityName,
              meta: {
                form: `${currentEntityName}:${entityId}`
              },
              payload: selectTenantsFormInitialValues(store.getState())
            }
          : {
              type: '@@redux-form/INITIALIZE',
              toastMessage,
              entityName: currentEntityName,
              meta: {
                form: `${currentEntityName}:${entityId}`
              },
              payload: {
                ...selectedEntity,
                logo: branding.logo,
                favicon: branding.favicon,
                ...JSON.parse(branding.styles),
                productName:
                  JSON.parse(branding.styles) && JSON.parse(branding.styles).productName
                    ? JSON.parse(branding.styles).productName
                    : branding.productName
              },
              response
            }
    );

export const CreateUpdateTenant = (action$, store) =>
  action$
    .ofType('FORM_SUBMIT')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ dirty, entityName }) => dirty && entityName === 'tenants')
    .map(a => {
      if (a.selectedEntityId === 'create') {
        return {
          type: 'CREATE_ENTITY',
          entityName: a.entityName,
          values: tenantsFormCreateValues(store.getState(), a.values)
        };
      } else if (a.selectedEntityId === 'bulk') {
        return {
          type: 'BULK_ENTITY_UPDATE',
          entityName: a.entityName,
          values: a.values.toJS()
        };
      } else {
        return {
          type: 'UPDATE_ENTITY',
          entityName: a.entityName,
          entityId: a.selectedEntityId,
          values: tenantsFormUpdateValues(a.values)
        };
      }
    });

export const SetTenantUpdateCreateOrUpdateBranding = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'tenants' && !isLogoOrFaviconSelected(store.getState()))
    .map(a => {
      if (
        getCurrentFormBrandingStyles(store.getState()) ===
        getSelectedTenantBrandingStyles(store.getState(), a.response.result.id)
      ) {
        return {
          ...a,
          entityId: a.response.result.id,
          type: a.type.startsWith('CREATE') ? 'CREATE_TENANT_FULFILLED' : 'UPDATE_TENANT_FULFILLED'
        };
      } else {
        return {
          ...a,
          type: a.type.startsWith('CREATE') ? 'CREATE_TENANT_BRANDING' : 'UPDATE_TENANT_BRANDING',
          entityId: a.response.result.id,
          sdkCall: {
            module: 'entities',
            data: {
              tenantId: a.response.result.id,
              styles: getCurrentFormBrandingStyles(store.getState()),
              ...getBrandingImagesUrlPart(store.getState(), a.response.result.id)
            },
            command: 'updateBranding',
            topic: 'cxengage/entities/update-branding-response'
          }
        };
      }
    });

export const InitiatesBrandingImagesUpload = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'tenants' && !!isLogoOrFaviconSelected(store.getState()))
    .switchMap(a =>
      from(['logo', 'favicon'])
        .filter(imageType => getCurrentFormValueByFieldName(store.getState(), `${imageType}Selected`))
        .map(imageType => {
          a.entityId = a.response.result.id;
          a.sdkCall = {
            module: 'entities',
            data: {},
            command: 'uploadBrandingImage',
            topic: 'cxengage/entities/upload-branding-image-response'
          };
          a.sdkCall.data.tenantId = a.response.result.id;
          a.sdkCall.data.file = a.values[`${imageType}Selected`];
          a.sdkCall.data.imageType = imageType;
          delete a.type;
          return {
            ...a,
            type: `UPLOAD_${imageType.toUpperCase()}_BRANDING_IMAGE`
          };
        })
    );

// Makes an API request to upload the branding images to the tenant:
export const UploadBrandingImages = action$ =>
  action$.ofType('UPLOAD_LOGO_BRANDING_IMAGE', 'UPLOAD_FAVICON_BRANDING_IMAGE').mergeMap(a =>
    fromPromise(sdkPromise(a.sdkCall))
      .map(response => handleSuccess(response, a))
      .catch(error => handleError(error, a))
  );

export const UpdateTenantBrandingAfterImagesUpload = (action$, store) =>
  action$
    .ofType('UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED', 'UPLOAD_FAVICON_BRANDING_IMAGE_FULFILLED')
    .filter(({ entityId }) => isTenantBrandingImagesUploaded(store.getState(), entityId))
    .map(a => ({
      ...a,
      type: getSelectedEntityId(store.getState()) === 'create' ? 'CREATE_TENANT_BRANDING' : 'UPDATE_TENANT_BRANDING',
      entityId: a.entityId,
      sdkCall: {
        module: 'entities',
        data: {
          tenantId: a.entityId,
          styles: getCurrentFormBrandingStyles(store.getState()),
          ...getBrandingImagesUrlPart(store.getState(), a.entityId)
        },
        command: 'updateBranding',
        topic: 'cxengage/entities/update-branding-response'
      }
    }));

// update tenant's branding request:
export const UpdateTenantBranding = action$ =>
  action$.ofType('CREATE_TENANT_BRANDING', 'UPDATE_TENANT_BRANDING').switchMap(a =>
    fromPromise(sdkPromise(a.sdkCall))
      .map(response => handleSuccess(response, a))
      .catch(error => handleError(error, a))
  );

export const SetTenantIdAfterBrandingIsUpdated = (action$, store) =>
  action$
    .ofType(
      'CREATE_TENANT_FULFILLED',
      'UPDATE_TENANT_FULFILLED',
      'CREATE_TENANT_BRANDING_FULFILLED',
      'UPDATE_TENANT_BRANDING_FULFILLED'
    )
    .map(a => {
      if (a.type.startsWith('CREATE')) {
        return {
          type: 'SET_SELECTED_ENTITY_ID',
          entityName: a.entityName,
          entityId: a.entityId,
          toastMessage:
            a.type === 'CREATE_TENANT_FULFILLED'
              ? 'Tenant was created sucessfully!'
              : 'Branding has been created sucessfully!'
        };
      } else {
        return {
          type: '@@redux-form/INITIALIZE',
          entityName: a.entityName,
          toastMessage:
            a.type === 'UPDATE_TENANT_FULFILLED'
              ? 'Tenant was updated sucessfully!'
              : 'Branding has been updated sucessfully!',
          payload: { ...getCurrentFormValues(store.getState()).toJS() },
          meta: {
            form: `${a.entityName}:${a.entityId}`
          },
          response: a.response
        };
      }
    });

export const DisplayToastMessage = (action$, store) =>
  action$
    .ofType('@@redux-form/INITIALIZE')
    .filter(({ entityName, toastMessage }) => entityName === 'tenants' && !!toastMessage)
    .map(({ toastMessage, response }) => {
      if (toastMessage.includes('Branding') && toastMessage.includes('create')) {
        Toast.success('Tenant was created sucessfully!');
      } else if (toastMessage.includes('Branding') && toastMessage.includes('update')) {
        Toast.success('Tenant was updated sucessfully!');
      }
      toastMessage.includes('Failed') ? Toast.error(toastMessage) : Toast.success(toastMessage);
      return { toastMessage, response };
    })
    .map(({ toastMessage, response }) => {
      if (toastMessage.includes('create') && !toastMessage.includes('Failed') && !isInIframe()) {
        return {
          type: 'UPDATE_CONFIG_UI_URL_WITH_QUERY_STRING',
          entityId: getSelectedEntityId(store.getState())
        };
      } else {
        return {
          type: toastMessage ? toastMessage.toUpperCase().replace(/\s/g, '_') : 'TENANT_DATA_FETCH_FULFILLED',
          response
        };
      }
    });

export const InitiatesTenantsBrandingReject = (action$, store) =>
  action$
    .ofType('UPLOAD_LOGO_BRANDING_IMAGE_REJECTED', 'UPLOAD_FAVICON_BRANDING_IMAGE_REJECTED')
    .filter(({ entityId }) => isTenantBrandingImagesUploaded(store.getState(), entityId))
    .map(a => ({
      ...a,
      type:
        getSelectedEntityId(store.getState()) === 'create'
          ? 'CREATE_TENANT_BRANDING_REJECTED'
          : 'UPDATE_TENANT_BRANDING_REJECTED'
    }));

export const SetTenantIdAfterBrandingIsRejected = action$ =>
  action$.ofType('CREATE_TENANT_BRANDING_REJECTED', 'UPDATE_TENANT_BRANDING_REJECTED').map(({ type, entityId }) => ({
    type: 'SET_SELECTED_ENTITY_ID',
    toastMessage: type.startsWith('CREATE') ? 'Failed to create Branding!' : 'Failed to update Branding!',
    entityId
  }));

// reset-tenant branding to default:
export const ResetTenantBrandingToDefault = action$ =>
  action$
    .ofType('RESET_TENANT_BRANDING_TO_DEFAULT')
    .map(a => ({
      ...a,
      sdkCall: {
        module: 'entities',
        data: {
          tenantId: a.entityId,
          styles: '{}',
          favicon: '',
          logo: ''
        },
        command: 'updateBranding',
        topic: 'cxengage/entities/update-branding-response'
      }
    }))
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a))
        .catch(error => handleError(error, a))
    );

export const SetSelectedTenantIdAfterResetingBranding = (action$, store) =>
  action$.ofType('RESET_TENANT_BRANDING_TO_DEFAULT_FULFILLED').map(a => {
    const formValues = getCurrentFormValues(store.getState())
      .delete('navbar')
      .delete('navbarText')
      .delete('primaryColor')
      .delete('accentColor')
      .delete('accentHoverColor')
      .delete('logo')
      .delete('favicon');
    const { result } = a.response;
    return {
      type: '@@redux-form/INITIALIZE',
      entityName: 'tenants',
      toastMessage: 'Branding has been reset to default sucessfully!',
      payload: { ...formValues.toJS(), ...JSON.parse(result.styles), logo: result.logo, favicon: result.favicon },
      meta: {
        form: `tenants:${a.entityId}`
      },
      response: a.response
    };
  });

// unset the selected images in the redux state once the images are saved to the backend:
export const UnSetSelectedImageAfterUpload = action$ =>
  action$
    .ofType('UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED', 'UPLOAD_FAVICON_BRANDING_IMAGE_FULFILLED')
    .filter(({ entityId }) => entityId !== 'create')
    .map(a => ({
      type: '@@redux-form/CHANGE',
      meta: {
        form: `tenants:${a.entityId}`,
        field: a.type === 'UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED' ? 'logoSelected' : 'faviconSelected',
        touch: false,
        persistentSubmitErrors: false
      },
      payload: null
    }));

// save the uploaded branding image files object to the current redux-form:
export const ChangeBrandingImageFileInState = (action$, store) =>
  action$.ofType('UPDATE_BRANDING_FILES_IN_STATE').map(a => ({
    type: '@@redux-form/CHANGE',
    meta: {
      form: `tenants:${getSelectedEntityId(store.getState())}`,
      field: `${a.name}Selected`,
      touch: false,
      persistentSubmitErrors: false
    },
    payload: a.file
  }));

export const SendBrandingUpdateToConfig1 = (action$, store) =>
  action$
    .ofType('BRANDING_HAS_BEEN_UPDATED_SUCESSFULLY!', 'BRANDING_HAS_BEEN_RESET_TO_DEFAULT_SUCESSFULLY!')
    .filter(() => !isInIframe())
    .switchMap(() =>
      fromPromise(sdkPromise({ module: 'tenantBrandingUpdated', tenantId: getSelectedEntityId(store.getState()) }))
    );

export const SendSwitchedTenantDetailsToConfig1 = (action$, store) =>
  action$
    .ofType('SWITCH_TENANT')
    .filter(({ setAsActiveTenant }) => !isInIframe() && setAsActiveTenant === true)
    .switchMap(({ tenantId }) =>
      fromPromise(sdkPromise({ module: 'switchTenant', tenantId, tenantName: getSelectedEntityName(store.getState()) }))
    );
