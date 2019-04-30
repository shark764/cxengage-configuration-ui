/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ReasonListsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { toggleShared } from '../../../redux/modules/entities';
import { reasonListsInitialValues, checkDisableShared } from '../../../redux/modules/entities/reasonLists/selectors';

const CreateReasonListsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ReasonListsForm);

export function mapStateToProps(state) {
  return {
    initialValues: reasonListsInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    disableShared: checkDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared')
  };
}

export const actions = {
  toggleShared
};

export default connect(mapStateToProps, actions)(CreateReasonListsForm);
