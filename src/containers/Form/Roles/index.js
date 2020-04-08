/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import RolesForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  isSystemRole,
  userHasSharePermission,
  userHasPermissions
} from '../../../redux/modules/entities/selectors';
import { toggleShared } from '../../../redux/modules/entities';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectRolesFormInitialValues,
  selectRolesDisableShared
} from '../../../redux/modules/entities/roles/selectors';

const CreateRolesForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(RolesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectRolesFormInitialValues(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasSharePermission: userHasSharePermission(state),
    userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    disableShared: selectRolesDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
    isSystemRole: isSystemRole(state)
  };
}

export const actions = {
  toggleShared
};

export default connect(mapStateToProps, actions)(CreateRolesForm);
