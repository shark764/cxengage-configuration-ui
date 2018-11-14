/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import SkillsForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isInherited, isCreating } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateSkillsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(SkillsForm);

export function mapStateToProps(state) {
  const initialValues = selectFormInitialValues(state);
  return {
    disableProficiency: initialValues.get('hasProficiency') && initialValues.get('id') !== undefined,
    initialValues: initialValues.has('hasProficiency') ? initialValues : initialValues.set('hasProficiency', false),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateSkillsForm);
