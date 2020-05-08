/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import TransferListsForm from './layout';
import { formValidation } from './validation';
import { setSelectedSubEntityId, removeTransferListItem } from '../../../redux/modules/entities';
import {
  getSelectedEntityId,
  isSaving,
  userHasUpdatePermission,
  isEntityFetching
} from '../../../redux/modules/entities/selectors';
import { createFormName, formSubmission } from '../../../redux/modules/form/selectors';
import {
  selectEndpointHeaders,
  transferListsFormInitialValues
} from '../../../redux/modules/entities/transferLists/selectors';

const CreateTransferListsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })
)(TransferListsForm);

export const mapStateToProps = state => ({
  isSaving: isSaving(state),
  key: getSelectedEntityId(state),
  isFetching: isEntityFetching(state, 'transferLists'),
  selectedEntityId: getSelectedEntityId(state),
  initialValues: transferListsFormInitialValues(state),
  endpointHeaders: selectEndpointHeaders(state),
  userHasUpdatePermission: userHasUpdatePermission(state)
});

export const mapDispatchToProps = dispatch => ({
  setSelectedSubEntityId: subEntityId => dispatch(setSelectedSubEntityId(subEntityId)),
  removeTransferListItem: transferListItemId =>
    dispatch(removeTransferListItem('transferListItem', transferListItemId)),
  removeCategoryItems: transferListItemId => dispatch(removeTransferListItem('categoryItems', transferListItemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransferListsForm);
