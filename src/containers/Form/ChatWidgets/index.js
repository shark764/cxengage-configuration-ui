/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ChatWidgetsForm from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';

import { getSelectedEntityId, isCreating } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../redux/modules/form/selectors';

export const formSubmission = (values, dispatch, props) => dispatch(onFormSubmit(values, props));
export const createFormName = state => ({
  form: `chatWidgets:${getSelectedEntityId(state)}`
});

const CreateChatWidgetsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    destroyOnUnmount: false
  })
)(ChatWidgetsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateChatWidgetsForm);
