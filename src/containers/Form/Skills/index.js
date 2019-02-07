/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import SkillsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { toggleProficiency } from '../../../redux/modules/entities';
import { getHasProficiencyFormValue } from '../../../redux/modules/entities/skills/selectors';

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
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    hasProficiency: getHasProficiencyFormValue(state)
  };
}

export const actions = {
  toggleProficiency
};

export default connect(mapStateToProps, actions)(CreateSkillsForm);
