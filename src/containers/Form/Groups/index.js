/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import GroupsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  userHasUpdatePermission,
  userHasPermissions,
  isInherited,
  isCreating
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateGroupsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(GroupsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateGroupsForm);
