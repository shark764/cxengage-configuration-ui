/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
 
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import CustomMetricsForm from './Layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../redux/modules/form/selectors';
import {
  getAbandonTypeFormValue
} from '../../../redux/modules/entities/customMetrics/selectors';

export const formSubmission = (values, dispatch, props) =>
  dispatch(onFormSubmit(values, props));
export const createFormName = state => ({
  form: `customMetrics:${getSelectedEntityId(state)}`
});

const CreateCustomMetricsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: false
  })
)(CustomMetricsForm);

export function mapStateToProps(state) {
  return {
    slaAbandonType: getAbandonTypeFormValue(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateCustomMetricsForm);