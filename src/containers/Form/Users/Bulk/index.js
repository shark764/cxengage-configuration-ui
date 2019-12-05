/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersBulkActionsFormLayout from './layout';
import { formValidation } from './validation';
import {
  isSaving,
  getCurrentEntity,
  getEntityData,
  userHasPermissions,
  isBulkUpdating
} from '../../../../redux/modules/entities/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';
import {
  formSubmission,
  getCurrentFormValueByFieldName,
  selectFormInitialValues
} from '../../../../redux/modules/form/selectors';

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
    initialValues: selectFormInitialValues(state),
    identityProviders: selectTenantIdentityProviders(state),
    inviteNowIsChecked: getCurrentFormValueByFieldName(state, 'inviteNow'),
    resendInvitationIsChecked: getCurrentFormValueByFieldName(state, 'resendInvitation'),
    cancelInvitationIsChecked: getCurrentFormValueByFieldName(state, 'cancelInvitation'),
    passwordResetIsChecked: getCurrentFormValueByFieldName(state, 'passwordReset'),
    groups: getEntityData(state, 'groups'),
    skills: getEntityData(state, 'skills'),
    isSaving: isSaving(state),
    isBulkUpdating: isBulkUpdating(state),
    key: `${getCurrentEntity(state)}:bulk`,
    displayResetPassword: userHasPermissions(state, ['PLATFORM_MANAGE_ALL_USER_PASSWORDS', 'MANAGE_ALL_USER_PASSWORDS'])
  };
}

export default connect(mapStateToProps)(UsersBulkActionsForm);
