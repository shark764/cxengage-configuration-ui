/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import GenericBulkItemsFormLayout from './layout';
import { isSaving, getCurrentEntity, isBulkUpdating } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission } from '../../../redux/modules/form/selectors';

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
    isSaving: isSaving(state),
    isBulkUpdating: isBulkUpdating(state),
    key: `${getCurrentEntity(state)}:bulk`
  };
}

export default connect(mapStateToProps)(GenericBulkItemsForm);
