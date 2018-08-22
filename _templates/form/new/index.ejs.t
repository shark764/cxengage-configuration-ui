---
to: src/containers/Form/<%= name %>/index.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import <%= name %>Form from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../redux/modules/form/selectors';

export const formSubmission = (values, dispatch, props) =>
  dispatch(onFormSubmit(values, props));
export const createFormName = state => ({
  form: `<%= name %>:${getSelectedEntityId(state)}`
});

let Create<%= name %>Form = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: false
  })
)(<%= name %>Form);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(Create<%= name %>Form);
