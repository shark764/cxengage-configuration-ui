/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import store from '../../../redux/store';
import DispositionListItemsForm from './layout';
import { formValidation } from './validation';
import { setSelectedSubEntityId, onSubEntityFormSubmit } from '../../../redux/modules/entities';
import { getSelectedSubEntityId, isSubEntitySaving } from '../../../redux/modules/entities/selectors';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  isUserCreatingNewCategory,
  hierarchyInputText,
  getSelectedDispositionListItemValues,
  dispositionListItemUpdateValues
} from '../../../redux/modules/entities/dispositionLists/selectors';

const UpdateDispositionListItemsForm = compose(
  connect(state => ({
    form: `dispositionListItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = dispositionListItemUpdateValues(store.getState(), props);
      return dispatch(onSubEntityFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(DispositionListItemsForm);

export const mapStateToProps = state => {
  return {
    key: getSelectedSubEntityId(state),
    isSaving: isSubEntitySaving(state),
    dispositionListName: getCurrentFormValueByFieldName(state, 'name'),
    selectedSubEntityId: getSelectedSubEntityId(state),
    initialValues: getSelectedDispositionListItemValues(state),
    dispositionListItemName: getSelectedSubEntityId(state),
    hierarchyInputText: hierarchyInputText(state),
    isUserCreatingNewCategory: isUserCreatingNewCategory(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDispositionListItemsForm);
