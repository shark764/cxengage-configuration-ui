/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasPermissions,
  isEntityFetching,
} from '../../../redux/modules/entities/selectors';
import {
  getCurrentAgentId,
  isCurrentTenantPlatformAuthenticationDisabled,
} from '../../../redux/modules/userData/selectors';
import { onFormSubmit, changeUserInviteStatus } from '../../../redux/modules/entities';
import { createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectUsersFormInitialValues,
  getUserInvitationStatus,
  userHasNameSet,
} from '../../../redux/modules/entities/users/selectors';
import { selectTenantRoles, selectPlatformRoles } from '../../../redux/modules/entities/roles/selectors';
import { selectTenantIdentityProviders } from '../../../redux/modules/entities/identityProviders/selectors';
import { getCapacityRulesSelector } from '../../../redux/modules/entities/capacityRules/selectors';

const CreateUsersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      return dispatch(onFormSubmit(values, props));
    },
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(UsersForm);

export function mapStateToProps(state) {
  return {
    platformRoles: selectPlatformRoles(state),
    tenantRoles: selectTenantRoles(state),
    capacityRules: getCapacityRulesSelector(state),
    tenantIdentityProviders: selectTenantIdentityProviders(state),
    status: getUserInvitationStatus(state),
    initialValues: selectUsersFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    currentAgentId: getCurrentAgentId(state),
    displayResetPassword: userHasPermissions(state, [
      'PLATFORM_MANAGE_ALL_USER_PASSWORDS',
      'MANAGE_ALL_USER_PASSWORDS',
    ]),
    usersFetching: isEntityFetching(state, 'users'),
    userHasNameSet: userHasNameSet(state),
    canManageAllExtensions: userHasPermissions(state, ['MANAGE_ALL_USER_EXTENSIONS']),
    formNoPasswordValue: getCurrentFormValueByFieldName(state, 'noPassword'),
    isCurrentTenantPlatformAuthenticationDisabled: isCurrentTenantPlatformAuthenticationDisabled(state),
  };
}
const actions = { changeUserInviteStatus };

export default connect(mapStateToProps, actions)(CreateUsersForm);
