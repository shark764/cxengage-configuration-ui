/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import TransferListItemsForm from './layout';
import { formValidation } from './validation';
import store from '../../../redux/store';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { setSelectedSubEntityId, onSubEntityFormSubmit } from '../../../redux/modules/entities';
import {
  isSubEntitySaving,
  getSelectedSubEntityId,
  getSelectedEntityId
} from '../../../redux/modules/entities/selectors';
import {
  selectActiveQueueNames,
  selectExistingCategories,
  isUserCreatingNewCategory,
  selectedContactType,
  hierarchyInputText,
  endpointFieldValue,
  transferListItemCreateValues
} from '../../../redux/modules/entities/transferLists/selectors';

const CreateTransferListItemsForm = reduxForm({
  form: 'transferListItems:create',
  onSubmit: (values, dispatch, props) => {
    const submitValues = transferListItemCreateValues(store.getState(), props);
    return dispatch(onSubEntityFormSubmit(submitValues, props));
  },
  validate: formValidation,
  destroyOnUnmount: true
})(TransferListItemsForm);

export const mapStateToProps = state => ({
  key: 'create',
  isSaving: isSubEntitySaving(state),
  transferListName: getCurrentFormValueByFieldName(state, 'name'),
  selectedEntityId: getSelectedEntityId(state),
  selectedContactType: selectedContactType(state),
  selectedSubEntityId: getSelectedSubEntityId(state),
  existingCategories: selectExistingCategories(state),
  selectActiveQueueNames: selectActiveQueueNames(state),
  hierarchyInputText: hierarchyInputText(state),
  endpointFieldValue: endpointFieldValue(state),
  isUserCreatingNewCategory: isUserCreatingNewCategory(state)
});

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransferListItemsForm);
