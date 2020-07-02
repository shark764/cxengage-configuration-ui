/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ListsForm from './layout';
import { createFormValidation as formValidation } from './validation';
import { isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { getListTypesOptions } from '../../../redux/modules/entities/listTypes/selectors';

const CreateListsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation
  })
)(ListsForm);

export function mapStateToProps(state) {
  return {
    listTypes: getListTypesOptions(state),
    initialValues: new Map({
      active: true,
      shared: true
    }),
    isSaving: isCreating(state),
    key: 'create',
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(CreateListsForm);
