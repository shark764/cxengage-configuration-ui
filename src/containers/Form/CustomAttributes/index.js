/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import CustomAttributesForm from './layout';
import { formValidation } from './validation';

import { createFormName } from '../../../redux/modules/form/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasCreatePermission,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { onFormSubmit } from '../../../redux/modules/entities';
import {
  selectCustomAtributesFormInitialValues,
  getAvailableCustomAttributesIdentifiers
} from '../../../redux/modules/entities/customAttributes/selectors';

const CreateCustomAttributesForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      // While updating a custom attribute, identifier should not be included in the PUT request body (as per the requirements).
      const submitValues = props.isCreatingNewAtrribute ? values : values.delete('identifier');
      return dispatch(onFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(CustomAttributesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectCustomAtributesFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasCreatePermission: userHasCreatePermission(state),
    key: getSelectedEntityId(state),
    isCreatingNewAtrribute: getSelectedEntityId(state) === 'create',
    availableIdentifiers: getAvailableCustomAttributesIdentifiers(state)
  };
}

export default connect(mapStateToProps)(CreateCustomAttributesForm);
