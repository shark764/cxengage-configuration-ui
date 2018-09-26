/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import GenericBulkItemsFormLayout from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';

import { isCreating, getCurrentEntity } from '../../../redux/modules/entities/selectors';

import { selectFormInitialValues } from '../../../redux/modules/form/selectors';

export const formSubmission = (values, dispatch, props) => dispatch(onFormSubmit(values, props));
export const createFormName = state => ({ form: `${getCurrentEntity(state)}:bulk` });

const GenericBulkItemsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    destroyOnUnmount: true
  })
)(GenericBulkItemsFormLayout);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    key: `${getCurrentEntity(state)}:bulk`
  };
}

export default connect(mapStateToProps)(GenericBulkItemsForm);
