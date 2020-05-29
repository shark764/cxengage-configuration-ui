import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
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
import { getCurrentFormValueByFieldName } from '../../../modules/form/selectors';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntityName } from '../../../modules/entities/selectors';
import {
  isLogoOrFaviconSelected,
  tenantsFormCreateValues,
  tenantsFormUpdateValues,
  getSelectedTenantBranding,
  tenantsPlatformPermissions,
  getCurrentFormBrandingStyles,
  selectTenantsFormInitialValues,
  getSelectedTenantBrandingStyles,
  isAllTenantDependenciesUploaded,
  isAllTenantsFormDependenciesFetched
} from './selectors';

// Fetch's all the tenant's that the user belongs to:
export const fetchTenants = ($action, store) =>
  $action
    .ofType('FETCH_DATA')
    .filter(({ entityName }) => entityName === 'tenants')
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
// Also after a tenant-update, only fetch branding because it's the only dependent entity that gets changed.
export const StartFetchingTenantsFormDependencies = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(a => ({
      ...a,
      currentEntityName: getCurrentEntity(store.getState()),
      isDefined: name => store.getState().getIn(['Entities', name, 'data']).size === 0,
      isDependentEntityDefined: name =>
        name === 'branding'
          ? true
          : store.getState().getIn(['Entities', 'tenants', 'dependentEntities', name, 'data']).size === 0,
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
      branding: getSelectedTenantBranding(store.getState()).toJS(),
      selectedEntity: getSelectedEntity(store.getState()) ? getSelectedEntity(store.getState()).toJS() : {}
    }))
    .map(
      ({ currentEntityName, toastMessage, entityId, selectedEntity, branding }) =>
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
                productName: JSON.parse(branding.styles).productName
                  ? JSON.parse(branding.styles).productName
                  : branding.productName
              }
            }
    );

export const DisplayToastMessage = action$ =>
  action$
    .ofType('@@redux-form/INITIALIZE')
    .filter(({ entityName }) => entityName === 'tenants')
    .map(({ toastMessage }) => {
      if (toastMessage) {
        if (toastMessage.includes('Branding') && toastMessage.includes('create')) {
          Toast.success('Tenant was created sucessfully!');
        } else if (toastMessage.includes('Branding') && toastMessage.includes('update')) {
          Toast.success('Tenant was updated sucessfully!');
        }
        toastMessage.includes('Failed') ? Toast.error(toastMessage) : Toast.success(toastMessage);
      }
      return {
        type: toastMessage ? toastMessage.toUpperCase().replace(/\s/g, '_') : 'TENANT_DATA_FETCH_FULFILLED'
      };
    });

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
          values: tenantsFormCreateValues(store.getState(), a.values),
          isBrandingImagesSelected: isLogoOrFaviconSelected(store.getState()),
          updatedBrandingStyles: getCurrentFormBrandingStyles(store.getState()),
          initialBrandingStyles: getSelectedTenantBrandingStyles(store.getState())
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
          values: tenantsFormUpdateValues(a.values),
          isBrandingImagesSelected: isLogoOrFaviconSelected(store.getState()),
          updatedBrandingStyles: getCurrentFormBrandingStyles(store.getState()),
          initialBrandingStyles: getSelectedTenantBrandingStyles(store.getState())
        };
      }
    });

// If Branding styles & images are not modified while creating & updating a tenant, don't make any further tenants dependent-entities requests:
export const SetSelectedTenantId = action$ =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'UPDATE_ENTITY_FULFILLED')
    .filter(
      a =>
        a.entityName === 'tenants' && !a.isBrandingImagesSelected && a.initialBrandingStyles === a.updatedBrandingStyles
    )
    .map(
      a =>
        a.type === 'CREATE_ENTITY_FULFILLED'
          ? {
              type: 'SET_SELECTED_ENTITY_ID',
              toastMessage: `Tenant was created sucessfully!`,
              entityName: a.entityName,
              entityId: a.response.result.id
            }
          : {
              type: '@@redux-form/INITIALIZE',
              entityName: a.entityName,
              toastMessage: `Tenant was updated sucessfully!`,
              payload: { ...a.values },
              meta: {
                form: `${a.entityName}:${a.response.result.id}`
              }
            }
    );

// If tenant's Branding Styles ae modified, update it upon creating & updating a tenant:
export const StartUpdatingTenantsBrandingStyles = action$ =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'tenants' && a.initialBrandingStyles !== a.updatedBrandingStyles)
    .map(a => ({
      ...a,
      actionType: a.type === 'CREATE_ENTITY_FULFILLED' ? 'create' : 'update',
      type: 'UPDATE_BRANDING_STYLES',
      entityId: a.response.result.id,
      sdkCall: {
        module: 'entities',
        data: {
          tenantId: a.response.result.id,
          styles: a.updatedBrandingStyles
        },
        command: 'updateBranding',
        topic: 'cxengage/entities/update-branding-response'
      }
    }));

// update tenant's branding styles request:
export const UpdateTenantsBrandingStyles = action$ =>
  action$.ofType('UPDATE_BRANDING_STYLES').switchMap(a =>
    fromPromise(sdkPromise(a.sdkCall))
      .map(response => handleSuccess(response, a))
      .catch(error => handleError(error, a))
  );

// Initiate's upload-branding-image request based on the selected logo & favicon:
export const StartBrandingImagesUpload = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY_FULFILLED', 'UPDATE_ENTITY_FULFILLED')
    .filter(({ entityName, isBrandingImagesSelected }) => entityName === 'tenants' && !!isBrandingImagesSelected)
    .map(a => ({
      ...a,
      entityId: a.response.result.id,
      actionType: a.type === 'CREATE_ENTITY_FULFILLED' ? 'create' : 'update',
      sdkCall: {
        module: 'entities',
        data: {},
        command: 'uploadBrandingImage',
        topic: 'cxengage/entities/upload-branding-image-response'
      },
      isImageSelected: imageType => getCurrentFormValueByFieldName(store.getState(), `${imageType}Selected`)
    }))
    .switchMap(a =>
      from(['logo', 'favicon'])
        .filter(imageType => a.isImageSelected(imageType))
        .map(imageType => {
          a.sdkCall.data.tenantId = a.response.result.id;
          a.sdkCall.data.file = a.values[`${imageType}Selected`];
          a.sdkCall.data.imageType = imageType;
          delete a.type;
          return {
            type: `UPLOAD_${imageType.toUpperCase()}_BRANDING_IMAGE`,
            imageType,
            ...a
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

// sets the current selected tenantId after the branding is uploaded to the backend
export const SetTenantIdAfterBrandingIsUpdated = (action$, store) =>
  action$
    .ofType(
      'UPDATE_BRANDING_STYLES_FULFILLED',
      'UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED',
      'UPLOAD_FAVICON_BRANDING_IMAGE_FULFILLED'
    )
    .filter(() => isAllTenantDependenciesUploaded(store.getState()))
    .map(({ actionType, entityId }) => ({
      type: 'SET_SELECTED_ENTITY_ID',
      toastMessage:
        actionType === 'create' ? 'Branding has been created sucessfully!' : 'Branding has been updated sucessfully!',
      entityId
    }));

// sets the current selected tenantId after the branding is uploaded to the backend
export const SetTenantIdAfterBrandingIsRejected = (action$, store) =>
  action$
    .ofType(
      'UPDATE_BRANDING_STYLES_REJECTED',
      'UPLOAD_LOGO_BRANDING_IMAGE_REJECTED',
      'UPLOAD_FAVICON_BRANDING_IMAGE_REJECTED'
    )
    .filter(() => isAllTenantDependenciesUploaded(store.getState()))
    .map(({ actionType, entityId }) => ({
      type: 'SET_SELECTED_ENTITY_ID',
      toastMessage: actionType === 'create' ? 'Failed to create Branding!' : 'Failed to update Branding!',
      entityId
    }));

// unset the selected images in the redux state once the images are saved to the backend:
export const UnSetSelectedImageAfterUpload = action$ =>
  action$
    .ofType('UPLOAD_LOGO_BRANDING_IMAGE_FULFILLED', 'UPLOAD_FAVICON_BRANDING_IMAGE_FULFILLED')
    .filter(({ entityId }) => entityId !== 'create')
    .map(a => ({
      type: '@@redux-form/CHANGE',
      meta: {
        form: `tenants:${a.entityId}`,
        field: `${a.imageType}Selected`,
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

// reset-tenant branding to default:
export const ResetTenantBrandingToDefault = action$ =>
  action$
    .ofType('RESET_TENANT_BRANDING_TO_DEFAULT')
    .map(a => ({
      ...a,
      sdkCall: {
        module: 'entities',
        data: {
          tenantId: a.selectedEntityId,
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
  action$.ofType('RESET_TENANT_BRANDING_TO_DEFAULT_FULFILLED').map(() => ({
    type: 'SET_SELECTED_ENTITY_ID',
    toastMessage: 'Branding has been reset to default sucessfully!',
    entityName: 'tenants',
    entityId: getSelectedEntityId(store.getState())
  }));

export const SendBrandingUpdateToConfig1 = (action$, store) =>
  action$
    .ofType('BRANDING_HAS_BEEN_UPDATED_SUCESSFULLY!', 'BRANDING_HAS_BEEN_RESET_TO_DEFAULT!')
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
