/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';

import TenantsForm from './layout';
import { formValidation } from './validation';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { UpdateBrandingImageFileInState, resetTenantBranding } from '../../../redux/modules/entities/index';

import { switchTenant } from '../../../redux/modules/userData/index';
import { selectTimezonesDropDownList } from '../../../redux/modules/entities/timezones/selectors';
import { selectRegionsDropDownList } from '../../../redux/modules/entities/regions/selectors';
import {
  isCreating,
  isUpdating,
  getSelectedEntityId,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import {
  getSelectedTenantSlas,
  getSelectedTenantUsers,
  selectTenantAdminUserId,
  getCurrentlySelectedTenantIdps,
  selectTenantsFormInitialValues,
  isSelectedTenantHasDefaultBranding,
  isAllTenantsFormDependenciesFetched,
  getSelectedTenantOutbndIntegrations,
  userHasTenantUpdatePermissions,
  userHasTenantBrandingUpdatePermissions,
  userHasBrandingProductNameUpdatePermissions,
  userHasTenantIdpViewPermissions,
  userHasPlatformViewPermission
} from '../../../redux/modules/entities/tenants/selectors';

const CreateTenantsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(TenantsForm);

export const mapStateToProps = state => ({
  key: getSelectedEntityId(state),
  tenantSlas: getSelectedTenantSlas(state),
  tenantUsers: getSelectedTenantUsers(state),
  regions: selectRegionsDropDownList(state),
  currentTenantId: state.getIn(['Entities', 'currentTenantId']),
  adminUserId: selectTenantAdminUserId(state),
  selectedEntityId: getSelectedEntityId(state),
  timezones: selectTimezonesDropDownList(state),
  isSaving: isCreating(state) || isUpdating(state),
  initialValues: selectTenantsFormInitialValues(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  identityProviders: getCurrentlySelectedTenantIdps(state),
  outboundIntegrations: getSelectedTenantOutbndIntegrations(state),
  allDependenciesFetched: isAllTenantsFormDependenciesFetched(state),
  isSelectedTenantHasDefaultBranding: isSelectedTenantHasDefaultBranding(state),
  userHasTenantUpdatePermissions: userHasTenantUpdatePermissions(state),
  userHasTenantBrandingUpdatePermissions: userHasTenantBrandingUpdatePermissions(state),
  userHasTenantIdpViewPermissions: userHasTenantIdpViewPermissions(state),
  userHasPlatformViewPermission: userHasPlatformViewPermission(state),
  userHasBrandingProductNameUpdatePermissions: userHasBrandingProductNameUpdatePermissions(state)
});

export const mapDispatchToProps = dispatch => ({
  uploadImage: (field, name) => dispatch(UpdateBrandingImageFileInState(field, name)),
  resetTenantBranding: entityId => dispatch(resetTenantBranding(entityId)),
  switchTenant: (tenantId, setAsActiveTenant) => dispatch(switchTenant(tenantId, setAsActiveTenant))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTenantsForm);
