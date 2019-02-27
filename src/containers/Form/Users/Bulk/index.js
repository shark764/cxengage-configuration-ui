/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersBulkActionsFormLayout from './layout';
import { formValidation } from './validation';
import { isCreating, getCurrentEntity } from '../../../../redux/modules/entities/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';
import { formSubmission } from '../../../../redux/modules/form/selectors';
import { toggleInvitationStatus } from '../../../../redux/modules/entities';
import { getCheckedBulkActionFormValue } from '../../../../redux/modules/entities/users/selectors';

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
      resetPassword: false
    }),
    identityProviders: selectTenantIdentityProviders(state),
    inviteNowIsChecked: getCheckedBulkActionFormValue(state, 'inviteNow'),
    resendInvitationIsChecked: getCheckedBulkActionFormValue(state, 'resendInvitation'),
    cancelInvitationIsChecked: getCheckedBulkActionFormValue(state, 'cancelInvitation'),
    passwordResetIsChecked: getCheckedBulkActionFormValue(state, 'passwordReset'),
    isSaving: isCreating(state),
    key: `${getCurrentEntity(state)}:bulk`
  };
}

export const actions = {
  toggleInviteNow: () => toggleInvitationStatus('inviteNow'),
  toggleResendInvitation: () => toggleInvitationStatus('resendInvitation'),
  toggleCancelInvitation: () => toggleInvitationStatus('cancelInvitation'),
  togglePasswordReset: () => toggleInvitationStatus('passwordReset')
};

export default connect(mapStateToProps, actions)(UsersBulkActionsForm);
