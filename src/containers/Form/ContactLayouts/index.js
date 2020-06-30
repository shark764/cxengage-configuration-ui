/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';

import contactLayoutsForm from './layout';
import { formValidation } from './validation';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

import {
  getSelectedEntityId,
  isSaving,
  isInherited,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../redux/modules/form/selectors';
import { setSelectedSubEntityId } from '../../../redux/modules/entities';

const CreateContactLayoutsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(contactLayoutsForm);

export const mapStateToProps = state => ({
  isSaving: isSaving(state),
  inherited: isInherited(state),
  key: getSelectedEntityId(state),
  initialValues: selectFormInitialValues(state),
  selectedEntityId: getSelectedEntityId(state),
  userHasUpdatePermission: userHasUpdatePermission(state)
});

export const mapDispatchToProps = dispatch => ({
  setSelectedSubEntityId: subEntityId => dispatch(setSelectedSubEntityId(subEntityId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactLayoutsForm);
