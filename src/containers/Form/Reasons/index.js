/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import reasonsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { getCurrentSharedValue } from '../../../redux/modules/entities/reasons/selectors';

const CreatereasonsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(reasonsForm);

export function mapStateToProps(state) {
  const initialValues = selectFormInitialValues(state);
  return {
    initialValues: initialValues.has('shared') ? initialValues : initialValues.set('shared', false),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    disableShared: initialValues.get('shared') && initialValues.get('id') !== undefined,
    sharedFormValue: getCurrentSharedValue(state),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(CreatereasonsForm);
