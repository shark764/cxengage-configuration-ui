/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import FlowsForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, userHasUpdatePermission, isCreating } from '../../../redux/modules/entities/selectors';
import {
  selectFlowVersions,
  selectFlowNames,
  selectFlowFormInitialValues
} from '../../../redux/modules/entities/flows/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateFlowsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(FlowsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFlowFormInitialValues(state),
    isSaving: isCreating(state),
    key: getSelectedEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    versions: selectFlowVersions(state),
    names: selectFlowNames(state)
  };
}

export default connect(mapStateToProps)(CreateFlowsForm);
