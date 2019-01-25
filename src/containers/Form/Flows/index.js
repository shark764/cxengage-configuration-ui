/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import FlowsForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, userHasUpdatePermission, isCreating } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateFlowsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: false
  })
)(FlowsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    key: getSelectedEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(CreateFlowsForm);
