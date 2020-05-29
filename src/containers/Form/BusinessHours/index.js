/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import BusinessHoursForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { selectBusinessHoursFormInitialValues } from '../../../redux/modules/entities/businessHours/selectors';

import { selectTimezonesDropDownList } from '../../../redux/modules/entities/timezones/selectors';

const CreateBusinessHoursForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(BusinessHoursForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectBusinessHoursFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    timezones: selectTimezonesDropDownList(state),
    businessHoursType: getCurrentFormValueByFieldName(state, 'businessHoursType')
  };
}

export default connect(mapStateToProps)(CreateBusinessHoursForm);
