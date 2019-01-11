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
  userHasPermissions
} from '../../../redux/modules/entities/selectors';
import { getCurrentAgentId } from '../../../redux/modules/userData/selectors';
import { onFormSubmit, changeUserInviteStatus } from '../../../redux/modules/entities';
import { selectFormInitialValues, createFormName } from '../../../redux/modules/form/selectors';
import { getUserInvitationStatus } from '../../../redux/modules/entities/users/selectors';
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
    destroyOnUnmount: true
  })
)(UsersForm);

export function mapStateToProps(state) {
  return {
    platformRoles: selectPlatformRoles(state),
    tenantRoles: selectTenantRoles(state),
    capacityRules: getCapacityRulesSelector(state),
    tenantIdentityProviders: selectTenantIdentityProviders(state),
    status: getUserInvitationStatus(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    currentAgentId: getCurrentAgentId(state),
    displayResetPassword: userHasPermissions(state, ['MANAGE_ALL_USER_PASSWORDS'])
  };
}
const actions = { changeUserInviteStatus };

export default connect(mapStateToProps, actions)(CreateUsersForm);
