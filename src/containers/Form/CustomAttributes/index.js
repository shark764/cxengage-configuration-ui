/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import CustomAttributesForm from './layout';
import { formValidation } from './validation';

import { createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
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
      let submitValues;
      if (props.isCreatingNewAtrribute) {
        // While creating a custom attribute, initialValue's default value should be 'nil' if a custom value is not provided (as per the requirements).
        submitValues = !values.get('initialValue') ? values.set('initialValue', 'nil') : values;
      } else {
        // Also  While updating a custom attribute, identifier should not be included in the PUT request body (as per the requirements).
        submitValues = values.delete('identifier');
      }
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
    key: getSelectedEntityId(state),
    isCreatingNewAtrribute: getSelectedEntityId(state) === 'create',
    initialValueFieldVal: getCurrentFormValueByFieldName(state, 'initialValue'),
    availableIdentifiers: getAvailableCustomAttributesIdentifiers(state)
  };
}

export default connect(mapStateToProps)(CreateCustomAttributesForm);
