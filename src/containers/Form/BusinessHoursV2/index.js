/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import BusinessHoursV2Form from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectBusinessHoursV2FormInitialValues,
  getBusinessHourV2Drafts
} from '../../../redux/modules/entities/businessHoursV2/selectors';

import { toggleShared } from '../../../redux/modules/entities';

const CreateBusinessHoursV2Form = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(BusinessHoursV2Form);

export function mapStateToProps(state) {
  return {
    initialValues: selectBusinessHoursV2FormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasSharePermission: userHasSharePermission(state),
    key: getSelectedEntityId(state),
    sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
    drafts: getBusinessHourV2Drafts(state)
  };
}

export const actions = {
  toggleShared
};

export default connect(mapStateToProps, actions)(CreateBusinessHoursV2Form);
