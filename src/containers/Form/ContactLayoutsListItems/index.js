/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import store from '../../../redux/store';

import { formValidation } from './validation';
import ContactLayoutsListItemsForm from './layout';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { setSelectedSubEntityId, onSubEntityFormSubmit } from '../../../redux/modules/entities';
import {
  isSubEntitySaving,
  getSelectedEntityId,
  getSelectedSubEntityId,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import {
  getExistingCategories,
  getAvailableContactAttributesNames,
  getExistingCategoryNamesInCurrentLayout,
  getContactLayoutsSubEntityFormSubmitValues,
  getContactLayoutsSubEntityFormInitialValues
} from '../../../redux/modules/entities/contactLayouts/selectors';

const CreateUpdateContactLayoutsListItemsForm = compose(
  connect(state => ({
    form: `contactLayoutsListItems:${getSelectedSubEntityId(state)}`
  })),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = getContactLayoutsSubEntityFormSubmitValues(store.getState(), props);
      return dispatch(onSubEntityFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ContactLayoutsListItemsForm);

export const mapStateToProps = (state, props) => {
  return {
    key: 'create',
    isSaving: isSubEntitySaving(state),
    selectedEntityId: getSelectedEntityId(state),
    existingCategories: getExistingCategories(state),
    selectedSubEntityId: getSelectedSubEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    contactLayoutName: getCurrentFormValueByFieldName(state, 'name'),
    existingCategoryNames: getExistingCategoryNamesInCurrentLayout(state),
    initialValues: getContactLayoutsSubEntityFormInitialValues(state, props),
    availableContactAttributesNames: getAvailableContactAttributesNames(state)
  };
};

export const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(setSelectedSubEntityId(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateContactLayoutsListItemsForm);
