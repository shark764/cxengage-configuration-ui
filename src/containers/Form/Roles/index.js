/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import RolesForm from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';
// import { formValidation } from './validation';
import { getSelectedEntityId, isCreating } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateRolesForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    // validate: formValidation,
    destroyOnUnmount: false
  })
)(RolesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateRolesForm);
