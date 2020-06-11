/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';
import { getUsers } from '../../../../redux/modules/entities/users/selectors';
import { getCurrentAgentId, getCurrentTenantId } from '../../../../redux/modules/userData/selectors';
import { getActiveUsersFullNames } from '../../../../redux/modules/entities/users/selectors';
import { getCurrentForm, getCurrentFormValueByFieldName } from '../../form/selectors';
import { getCurrentRegionId } from '../regions/selectors';
import { getSelectedEntity, getSelectedEntityId, isEntityFetching, findEntity, userHasPermissions } from '../selectors';

export const selectTenantsFormInitialValues = createSelector(
  [getSelectedEntity, getCurrentAgentId],
  (selectedEntity, currentAgentId) =>
    selectedEntity
      ? selectedEntity
      : Map({
          adminUserId: currentAgentId,
          timezone: 'US/Eastern',
          cxengageIdentityProvider: 'enabled',
          defaultIdentityProvider: 'none'
        })
);

const selectedTenantUsers = createSelector(
  getSelectedEntity,
  entity => entity && entity.getIn(['dependentEntities', 'users', 'data'])
);

const selectedTenantSlas = createSelector(
  getSelectedEntity,
  entity => entity && entity.getIn(['dependentEntities', 'slas', 'data'])
);

const selectedTenantIdps = createSelector(
  getSelectedEntity,
  entity => entity && entity.getIn(['dependentEntities', 'identityProviders', 'data'])
);

const selectedTenantIntegrations = createSelector(
  getSelectedEntity,
  entity => entity && entity.getIn(['dependentEntities', 'integrations', 'data'])
);

const selectedTenantBranding = createSelector(
  getSelectedEntity,
  entity => entity && entity.getIn(['dependentEntities', 'branding', 'data'])
);

export const getSelectedTenantUsers = createSelector(
  [getSelectedEntityId, getUsers, selectedTenantUsers],
  (selectedEntityId, users, selectedTenantUsers) => {
    if (selectedEntityId === 'create') {
      return users && users.size > 0 ? getActiveUsersFullNames(users) : List();
    } else {
      return selectedTenantUsers && selectedTenantUsers.size > 0
        ? getActiveUsersFullNames(selectedTenantUsers)
        : List();
    }
  }
);

export const getSelectedTenantSlas = createSelector(
  [selectedTenantSlas],
  slas =>
    slas && slas.size > 0
      ? slas
          .filter(sla => sla.get('active') === true)
          .map(activeSla => ({ value: activeSla.get('id'), label: activeSla.get('name') }))
      : List()
);

export const getCurrentlySelectedTenantIdps = createSelector(
  [selectedTenantIdps],
  idps =>
    idps && idps.size > 0
      ? idps
          .filter(idp => idp.get('active') === true)
          .filter(idp => idp.get('name') !== null)
          .map(idp => ({ value: idp.get('id'), label: idp.get('name') }))
      : List()
);

export const getSelectedTenantOutbndIntegrations = createSelector(
  [selectedTenantIntegrations],
  integrations =>
    integrations && integrations.size > 0
      ? integrations
          .filter(integration => integration.get('active') === true)
          .filter(
            integration =>
              (integration.get('type') === 'twilio' && integration.getIn(['properties', 'webRtc'])) ||
              integration.get('type') === 'serenova-voice'
          )
          .map(a => ({ label: capitalizeFirstLetter(a.get('type')), value: a.get('id') }))
      : List()
);

export const selectTenantAdminUserId = createSelector(
  [getSelectedEntity],
  selectedEntity => (selectedEntity ? selectedEntity.get('adminUserId') : List())
);

export const getParentTenantId = createSelector(
  [getSelectedEntity],
  selectedEntity => (selectedEntity ? selectedEntity.getIn(['parent', 'id']) : Map({}))
);

export const getSelectedTenantBranding = createSelector(
  [selectedTenantBranding],
  branding => (branding && branding.size > 0 ? branding : Map({}))
);

export const getBrandingImagesUrlPart = (state, entityId) => {
  const entity = findEntity(state, 'tenants', entityId);
  const branding = entity ? entity.getIn(['dependentEntities', 'branding', 'data']) : Map({});
  const regx = new RegExp(`${entityId}/.+`);
  return ['logo', 'favicon'].reduce((accu, imageType) => {
    accu[imageType] =
      branding && branding.get(imageType) && regx.test(branding.get(imageType))
        ? regx.exec(branding.get(imageType))[0]
        : '';
    return accu;
  }, {});
};

export const isSelectedTenantHasDefaultBranding = state => {
  const entity = findEntity(state, 'tenants', getSelectedEntityId(state));
  const branding = entity && entity.getIn(['dependentEntities', 'branding', 'data']);
  if (branding && branding.size > 0) {
    return (
      branding.get('logo') === '' &&
      branding.get('favicon') === '' &&
      (branding.get('styles') === '{}' || branding.get('styles') === '{"productName":"CxEngage"}')
    );
  } else {
    return undefined;
  }
};

export const isTenantBrandingImagesUploaded = (state, entityId) => {
  const entity = findEntity(state, 'tenants', entityId);
  const branding = entity && entity.getIn(['dependentEntities', 'branding']);
  if (branding) {
    return ['logo', 'favicon'].every(a => !branding.get(`${a}Uploading`));
  } else {
    return true;
  }
};

export const getSelectedTenantBrandingStyles = (state, entityId) => {
  const entity = findEntity(state, 'tenants', entityId);
  const branding = entity ? entity.getIn(['dependentEntities', 'branding', 'data']) : Map({});
  if (branding && branding.get('styles')) {
    const styles = JSON.parse(branding.get('styles'));
    return JSON.stringify({
      accentColor: styles.accentColor,
      accentHoverColor: styles.accentHoverColor,
      primaryColor: styles.primaryColor,
      navbar: styles.navbar,
      navbarText: styles.navbarText,
      productName: branding.get('productName') ? branding.get('productName') : styles.productName
    });
  } else {
    return '{}';
  }
};

export const getCurrentFormBrandingStyles = createSelector(
  getCurrentForm,
  currentForm =>
    currentForm.get('values') && currentForm.get('values').size > 0
      ? JSON.stringify({
          accentColor: currentForm.getIn(['values', 'accentColor']),
          accentHoverColor: currentForm.getIn(['values', 'accentHoverColor']),
          primaryColor: currentForm.getIn(['values', 'primaryColor']),
          navbar: currentForm.getIn(['values', 'navbar']),
          navbarText: currentForm.getIn(['values', 'navbarText']),
          productName: currentForm.getIn(['values', 'productName'])
        })
      : '{}'
);

export const isDependentEntityFetching = (state, dependentEntity) =>
  getSelectedEntity(state) && getSelectedEntity(state).getIn(['dependentEntities', dependentEntity, 'fetching']);

export const isAllTenantsFormDependenciesFetched = state =>
  ['users', 'timezones', 'regions'].every(entityName => !isEntityFetching(state, entityName)) &&
  ['users', 'slas', 'identityProviders', 'integrations', 'branding', 'protectedBranding'].every(
    dependentEntity => !isDependentEntityFetching(state, dependentEntity, 'tenants')
  );

export const tenantsFormCreateValues = (state, values) =>
  values && values.size > 0
    ? values
        .delete('cxengageIdentityProvider')
        .delete('defaultIdentityProvider')
        .set('adminUserId', getCurrentAgentId(state))
        .set('parentId', getCurrentTenantId(state))
        .set('regionId', getCurrentRegionId(state))
        .set('active', true)
        .toJS()
    : undefined;

export const tenantsFormUpdateValues = values =>
  values && values.size > 0
    ? {
        ...values.toJS(),
        defaultSlaId: values.get('defaultSlaId') === '' ? null : values.get('defaultSlaId'),
        outboundIntegrationId: values.get('outboundIntegrationId') === '' ? null : values.get('outboundIntegrationId'),
        defaultIdentityProvider:
          values.get('defaultIdentityProvider') === '' ? null : values.get('defaultIdentityProvider')
      }
    : undefined;

export const isLogoOrFaviconSelected = state =>
  getCurrentFormValueByFieldName(state, 'logoSelected') || getCurrentFormValueByFieldName(state, 'faviconSelected');

export const tenantsPlatformPermissions = [
  'PLATFORM_VIEW_ALL_TENANTS',
  'PLATFORM_MANAGE_ALL_TENANTS',
  'PLATFORM_CREATE_ALL_TENANTS',
  'PLATFORM_CREATE_TENANT_ROLES',
  'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT'
];

export const userHasTenantUpdatePermissions = state =>
  userHasPermissions(state, ['PLATFORM_MANAGE_ALL_TENANTS', 'MANAGE_TENANT']);

export const userHasTenantBrandingUpdatePermissions = state =>
  userHasTenantUpdatePermissions(state) && userHasPermissions(state, ['MANAGE_ALL_BRANDINGS']);

export const userHasBrandingProductNameUpdatePermissions = state =>
  userHasTenantBrandingUpdatePermissions(state) && userHasPermissions(state, ['PLATFORM_MANAGE_PRODUCT_NAME']);

export const userHasTenantIdpViewPermissions = state =>
  userHasPermissions(state, ['IDENTITY_PROVIDERS_READ', 'IDENTITY_PROVIDERS_UPDATE']);

export const userHasTenantIdpUpdatePermissions = state =>
  userHasTenantUpdatePermissions(state) && userHasPermissions(state, ['IDENTITY_PROVIDERS_UPDATE']);

export const userHasPlatformViewPermission = state => userHasPermissions(state, ['PLATFORM_VIEW_ALL']);

export const isTenantsFetched = state => state.getIn(['Entities', 'tenants', 'data']).size === 0;
