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
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { getUserTenantStatus, getInvitationScenario } from '../../../redux/modules/entities/users/selectors';
import { selectTenantRoles, selectPlatformRoles } from '../../../redux/modules/entities/roles/selectors';

const CreateUsersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(UsersForm);

export function mapStateToProps(state) {
  return {
    platformRoles: selectPlatformRoles(state),
    tenantRoles: selectTenantRoles(state),
    status: getUserTenantStatus(state),
    scenario: getInvitationScenario(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateUsersForm);
