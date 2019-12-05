/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import DispositionListItemsForm from './layout';
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
  isUserCreatingNewCategory,
  hierarchyInputText,
  dispositionListItemCreateValues,
  selectExistingCategories,
  selectActiveDispositionDropDownData
} from '../../../redux/modules/entities/dispositionLists/selectors';

const CreateDispositionListItemsForm = reduxForm({
  form: 'dispositionListItems:create',
  onSubmit: (values, dispatch, props) => {
    const submitValues = dispositionListItemCreateValues(store.getState(), props);
    return dispatch(onSubEntityFormSubmit(submitValues, props));
  },
  validate: formValidation,
  destroyOnUnmount: true
})(DispositionListItemsForm);

export const mapStateToProps = state => {
  return {
    key: 'create',
    isSaving: isSubEntitySaving(state),
    dispositionListName: getCurrentFormValueByFieldName(state, 'name'),
    selectedEntityId: getSelectedEntityId(state),
    selectedSubEntityId: getSelectedSubEntityId(state),
    existingCategories: selectExistingCategories(state),
    hierarchyInputText: hierarchyInputText(state),
    isUserCreatingNewCategory: isUserCreatingNewCategory(state),
    dispositions: selectActiveDispositionDropDownData(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDispositionListItemsForm);
