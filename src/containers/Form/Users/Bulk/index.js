/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersBulkActionsFormLayout from './layout';
import { formValidation } from './validation';
import {
  isCreating,
  getCurrentEntity,
  getEntityData,
  userHasPermissions
} from '../../../../redux/modules/entities/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';
import { formSubmission, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';

export const createFormName = state => ({ form: `${getCurrentEntity(state)}:bulk` });

const UsersBulkActionsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(UsersBulkActionsFormLayout);

export function mapStateToProps(state) {
  return {
    initialValues: new Map({
      inviteNow: false,
      resendInvitation: false,
      cancelInvitation: false,
      passwordReset: false
    }),
    identityProviders: selectTenantIdentityProviders(state),
    inviteNowIsChecked: getCurrentFormValueByFieldName(state, 'inviteNow'),
    resendInvitationIsChecked: getCurrentFormValueByFieldName(state, 'resendInvitation'),
    cancelInvitationIsChecked: getCurrentFormValueByFieldName(state, 'cancelInvitation'),
    passwordResetIsChecked: getCurrentFormValueByFieldName(state, 'passwordReset'),
    groups: getEntityData(state, 'groups'),
    skills: getEntityData(state, 'skills'),
    isSaving: isCreating(state),
    key: `${getCurrentEntity(state)}:bulk`,
    displayResetPassword: userHasPermissions(state, ['PLATFORM_MANAGE_ALL_USER_PASSWORDS', 'MANAGE_ALL_USER_PASSWORDS'])
  };
}

export default connect(mapStateToProps)(UsersBulkActionsForm);
