/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ListsForm from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { createFormValidation } from './validation';
import { isCreating } from '../../../redux/modules/entities/selectors';
import { getListTypesOptions } from '../../../redux/modules/entities/listTypes/selectors';

const CreateListForm = reduxForm({
  form: 'lists:create',
  onSubmit: (values, dispatch, props) => dispatch(onFormSubmit(values, props)),
  validate: createFormValidation
})(ListsForm);

export function mapStateToProps(state) {
  return {
    listTypes: getListTypesOptions(state),
    initialValues: new Map({
      active: true,
      shared: true
    }),
    isSaving: isCreating(state),
    key: 'create'
  };
}

export default connect(mapStateToProps)(CreateListForm);
