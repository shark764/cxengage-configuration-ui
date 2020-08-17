/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import store from '../../../redux/store';
import { reduxForm } from 'redux-form/immutable';

import contactAttributesForm from './layout';
import { formValidation } from './validation';
import { createFormName } from '../../../redux/modules/form/selectors';

import {
  getSelectedEntityId,
  isSaving,
  isInherited,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import {
  selectContactAttributeFormInitalValues,
  getContactAttributesFormSubmitValues
} from '../../../redux/modules/entities/contactAttributes/selectors';
import { onFormSubmit } from '../../../redux/modules/entities';

const CreateContactAttributesForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      const submitValues = getContactAttributesFormSubmitValues(store.getState(), props);
      return dispatch(onFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(contactAttributesForm);

export const mapStateToProps = state => ({
  isSaving: isSaving(state),
  inherited: isInherited(state),
  key: getSelectedEntityId(state),
  selectedEntityId: getSelectedEntityId(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  initialValues: selectContactAttributeFormInitalValues(state)
});

export default connect(mapStateToProps)(CreateContactAttributesForm);
