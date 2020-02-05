/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import CustomAttributesForm from './layout';
import { formValidation } from './validation';

import {
  createFormName,
  selectFormInitialValues,
  getCurrentFormValueByFieldName
} from '../../../redux/modules/form/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { onFormSubmit } from '../../../redux/modules/entities';

const CreateCustomAttributesForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      // While creating a custom attribute, initialValue's default value should be 'nil' if a custom value is not provided & dataType should always be 'text' (as per the requirements)
      // Also  While creating a custom attribute, identifier should not be included in the PUT request body (as per the requirements)
      const submitValues =
        props.isCreatingNewAtrribute && !values.get('initialValue')
          ? values.set('initialValue', 'nil').set('dataType', 'text')
          : values.delete('identifier');
      return dispatch(onFormSubmit(submitValues, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(CustomAttributesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    isCreatingNewAtrribute: getSelectedEntityId(state) === 'create',
    initialValueFieldVal: getCurrentFormValueByFieldName(state, 'initialValue')
  };
}

export default connect(mapStateToProps)(CreateCustomAttributesForm);
