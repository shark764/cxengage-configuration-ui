/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import SlasForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import {
  selectSlaVersions,
  selectSlaFormInitialValues,
  isSlaTenantDefault
} from '../../../redux/modules/entities/slas/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { toggleShared } from '../../../redux/modules/entities';
import { checkDisableShared } from '../../../redux/modules/entities/reasonLists/selectors';

const CreateSlasForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(SlasForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectSlaFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    versions: selectSlaVersions(state),
    slaAbandonType: getCurrentFormValueByFieldName(state, 'abandonType'),
    isSlaTenantDefault: isSlaTenantDefault(state),
    disableShared: checkDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
    key: getSelectedEntityId(state)
  };
}

export const actions = {
  toggleShared
};

export default connect(mapStateToProps, actions)(CreateSlasForm);
