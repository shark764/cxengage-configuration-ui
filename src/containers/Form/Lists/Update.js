/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ListsForm from './layout';
import { updateFormValidation as formValidation } from './validation';
import { getSelectedEntityId, isInherited, isUpdating } from '../../../redux/modules/entities/selectors';
import { getListTypeName, getInitialUpdateFormValues } from '../../../redux/modules/entities/lists/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const UpdateListsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ListsForm);

export function mapStateToProps(state) {
  return {
    update: true,
    initialValues: getInitialUpdateFormValues(state),
    listType: getListTypeName(state),
    isSaving: isUpdating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(UpdateListsForm);
