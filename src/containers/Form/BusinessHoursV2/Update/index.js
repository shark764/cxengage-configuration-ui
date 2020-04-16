/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import BusinessHoursV2UpdateForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId } from '../../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../../redux/modules/form/selectors';

const UpdateBusinessHoursV2Form = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(BusinessHoursV2UpdateForm);

export function mapStateToProps(state) {
  return {
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(UpdateBusinessHoursV2Form);
