/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import DispositionListsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectDispositionsHeaders,
  dispositionListsInitialValues
} from '../../../redux/modules/entities/dispositionLists/selectors';
import { setSelectedSubEntityId } from '../../../redux/modules/entities';
import { checkDisableShared } from '../../../redux/modules/entities/reasonLists/selectors';
import { removeDispositionListItem } from '../../../redux/modules/entities/dispositionLists/actions';

const CreateDispositionListsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(DispositionListsForm);

export function mapStateToProps(state) {
  return {
    initialValues: dispositionListsInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasSharePermission: userHasSharePermission(state),
    key: getSelectedEntityId(state),
    selectedEntityId: getSelectedEntityId(state),
    dispositionHeaders: selectDispositionsHeaders(state),
    disableShared: checkDisableShared(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared')
  };
}

export const mapDispatchToProps = dispatch => ({
  setSelectedSubEntityId: subEntityId => dispatch(setSelectedSubEntityId(subEntityId)),
  removeDispositionListItem: dispositionListItemId =>
    dispatch(removeDispositionListItem('dispositionListItem', dispositionListItemId)),
  removeCategoryItems: dispositionListItemId =>
    dispatch(removeDispositionListItem('categoryItems', dispositionListItemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDispositionListsForm);
