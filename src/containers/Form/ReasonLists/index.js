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
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { setSelectedSubEntityId, removeReasonListItem } from '../../../redux/modules/entities';
import {
  reasonListsInitialValues,
  checkDisableShared,
  selectReasonHeaders
} from '../../../redux/modules/entities/reasonLists/selectors';

const CreateReasonListsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })
)(ReasonListsForm);

export function mapStateToProps(state) {
  return {
    initialValues: reasonListsInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasSharePermission: userHasSharePermission(state),
    disableShared: checkDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
    selectedEntityId: getSelectedEntityId(state),
    reasonHeaders: selectReasonHeaders(state)
  };
}

export const mapDispatchToProps = dispatch => ({
  setSelectedSubEntityId: subEntityId => dispatch(setSelectedSubEntityId(subEntityId)),
  removeReasonListItem: reasonListItemId => dispatch(removeReasonListItem('reasonListItem', reasonListItemId)),
  removeCategoryItems: reasonListItemId => dispatch(removeReasonListItem('categoryItems', reasonListItemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReasonListsForm);
