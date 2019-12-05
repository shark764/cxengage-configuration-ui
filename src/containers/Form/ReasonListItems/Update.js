/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import store from '../../../redux/store';
import ReasonListItemsForm from './layout';
import { formValidation } from './validation';
import { setSelectedSubEntityId, onSubEntityFormSubmit } from '../../../redux/modules/entities';
import { getSelectedSubEntityId, isSubEntitySaving } from '../../../redux/modules/entities/selectors';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  isUserCreatingNewCategory,
  hierarchyInputText,
  getSelectedReasonListItemValues,
  reasonListItemUpdateValues
} from '../../../redux/modules/entities/reasonLists/selectors';

const UpdateReasonListItemsForm = compose(
  connect(state => ({
    form: `reasonListItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = reasonListItemUpdateValues(store.getState(), props);
      return dispatch(onSubEntityFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ReasonListItemsForm);

export const mapStateToProps = state => {
  return {
    key: getSelectedSubEntityId(state),
    isSaving: isSubEntitySaving(state),
    reasonListName: getCurrentFormValueByFieldName(state, 'name'),
    selectedSubEntityId: getSelectedSubEntityId(state),
    initialValues: getSelectedReasonListItemValues(state),
    reasonListItemName: getSelectedSubEntityId(state),
    hierarchyInputText: hierarchyInputText(state),
    isUserCreatingNewCategory: isUserCreatingNewCategory(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReasonListItemsForm);
