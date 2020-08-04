/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import store from '../../../redux/store';

import contactLayoutsForm from './layout';
import { formValidation } from './validation';
import { createFormName } from '../../../redux/modules/form/selectors';

import {
  getSelectedEntityId,
  isSaving,
  isInherited,
  isEntityFetching,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, onFormSubmit } from '../../../redux/modules/entities';
import { removeContactLayoutsListItem } from '../../../redux/modules/entities/contactLayouts/actions';
import {
  getContactLayoutsFormInitialValues,
  getContactLayoutsFormSubmitValues,
  selectContactLayoutsHeaders,
  isCurrentFormMissingMandatoryAttributes,
  getMissingMandatoryAttributesNames
} from '../../../redux/modules/entities/contactLayouts/selectors';

const CreateContactLayoutsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = getContactLayoutsFormSubmitValues(store.getState(), props);
      return dispatch(onFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(contactLayoutsForm);

export const mapStateToProps = state => ({
  isSaving: isSaving(state),
  inherited: isInherited(state),
  key: getSelectedEntityId(state),
  selectedEntityId: getSelectedEntityId(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  initialValues: getContactLayoutsFormInitialValues(state),
  contactLayoutsHeaders: selectContactLayoutsHeaders(state),
  isContactAttributesFetching: isEntityFetching(state, 'contactAttributes'),
  missingMandatoryAttributesNames: getMissingMandatoryAttributesNames(state),
  isCurrentFormMissingMandatoryAttributes: isCurrentFormMissingMandatoryAttributes(state)
});

export const mapDispatchToProps = dispatch => ({
  setSelectedSubEntityId: subEntityId => dispatch(setSelectedSubEntityId(subEntityId)),
  removeContactLayoutsListItem: contactLayoutsListItemId =>
    dispatch(removeContactLayoutsListItem('contactLayoutsListItem', contactLayoutsListItemId)),
  removeCategoryItems: contactLayoutsListItemId =>
    dispatch(removeContactLayoutsListItem('categoryItems', contactLayoutsListItemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactLayoutsForm);
