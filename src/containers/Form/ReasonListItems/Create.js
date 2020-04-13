/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ReasonListItemsForm from './layout';
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
  isUncategorized,
  isUserCreatingNewCategory,
  hierarchyInputText,
  reasonListItemCreateValues,
  selectExistingCategories,
  selectActiveReasonDropDownData
} from '../../../redux/modules/entities/reasonLists/selectors';

const CreateReasonListItemsForm = reduxForm({
  form: 'reasonListItems:create',
  onSubmit: (values, dispatch, props) => {
    const submitValues = reasonListItemCreateValues(store.getState(), props);
    return dispatch(onSubEntityFormSubmit(submitValues, props));
  },
  validate: formValidation,
  destroyOnUnmount: true
})(ReasonListItemsForm);

export const mapStateToProps = state => {
  return {
    key: 'create',
    isSaving: isSubEntitySaving(state),
    reasonListName: getCurrentFormValueByFieldName(state, 'name'),
    selectedEntityId: getSelectedEntityId(state),
    selectedSubEntityId: getSelectedSubEntityId(state),
    existingCategories: selectExistingCategories(state),
    hierarchyInputText: hierarchyInputText(state),
    isUncategorized: isUncategorized(state),
    isUserCreatingNewCategory: isUserCreatingNewCategory(state),
    reasons: selectActiveReasonDropDownData(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateReasonListItemsForm);
