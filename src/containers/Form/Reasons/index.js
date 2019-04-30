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
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { toggleShared } from '../../../redux/modules/entities';
import { selectReasonsFormInitialValues } from '../../../redux/modules/entities/reasons/selectors';
import { checkDisableShared } from '../../../redux/modules/entities/reasonLists/selectors';

const CreatereasonsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(reasonsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectReasonsFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    disableShared: checkDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export const actions = {
  toggleShared
};

export default connect(mapStateToProps, actions)(CreatereasonsForm);
