/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import OutboundIdentifiersForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isCreating } from '../../../redux/modules/entities/selectors';
import { selectFlowIds } from '../../../redux/modules/entities/flows/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateOutboundIdentifiersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(OutboundIdentifiersForm);

export function mapStateToProps(state) {
  return {
    flowIds: selectFlowIds(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateOutboundIdentifiersForm);
