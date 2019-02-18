/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import TransferListsForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import {
  selectTransferListsCreateFormInitialValues,
  formSubmission,
  createFormName
} from '../../../redux/modules/form/selectors';

const CreateTransferListsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(TransferListsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectTransferListsCreateFormInitialValues(state),
    isSaving: isCreating(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateTransferListsForm);
