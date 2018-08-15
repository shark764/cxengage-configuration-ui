/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import OutboundIdentifiersForm from './Layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isCreating
} from '../../../redux/modules/entities/selectors';
import { selectFlowIds } from '../../../redux/modules/entities/flows/selectors';
import { selectFormInitialValues } from '../../../redux/modules/form/selectors';

export const formSubmission = (values, dispatch, props) =>
  dispatch(onFormSubmit(values, props));
export const createFormName = state => ({
  form: `outboundIdentifiers:${getSelectedEntityId(state)}`
});

const CreateOutboundIdentifierForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: false
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

export default connect(mapStateToProps)(CreateOutboundIdentifierForm);
