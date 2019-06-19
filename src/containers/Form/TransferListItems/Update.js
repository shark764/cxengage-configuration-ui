/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import store from '../../../redux/store';
import TransferListItemsForm from './layout';
import { formValidation } from './validation';
import { setSelectedSubEntityId, onSubEntityFormSubmit } from '../../../redux/modules/entities';
import { getSelectedSubEntityId, isSubEntitySaving } from '../../../redux/modules/entities/selectors';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectActiveQueueNames,
  selectExistingCategories,
  getSelectedTransferListItemValues,
  isUserCreatingNewCategory,
  selectedContactType,
  hierarchyInputText,
  endpointFieldValue,
  transferListItemUpdateValues
} from '../../../redux/modules/entities/transferLists/selectors';

const UpdateTransferListItemsForm = compose(
  connect(state => ({
    form: `transferListItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = transferListItemUpdateValues(store.getState(), props);
      return dispatch(onSubEntityFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(TransferListItemsForm);

export const mapStateToProps = state => ({
  key: getSelectedSubEntityId(state),
  isSaving: isSubEntitySaving(state),
  transferListName: getCurrentFormValueByFieldName(state, 'name'),
  selectedContactType: selectedContactType(state),
  selectedSubEntityId: getSelectedSubEntityId(state),
  transferListItemName: getSelectedSubEntityId(state),
  existingCategories: selectExistingCategories(state),
  selectActiveQueueNames: selectActiveQueueNames(state),
  initialValues: getSelectedTransferListItemValues(state),
  hierarchyInputText: hierarchyInputText(state),
  endpointFieldValue: endpointFieldValue(state),
  isUserCreatingNewCategory: isUserCreatingNewCategory(state)
});

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTransferListItemsForm);
