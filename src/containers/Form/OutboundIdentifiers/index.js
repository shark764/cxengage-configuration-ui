/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import OutboundIdentifiersForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isCreating,
  userHasUpdatePermission,
  isEntityFetching
} from '../../../redux/modules/entities/selectors';
import { selectNonReusableFlows } from '../../../redux/modules/entities/flows/selectors';
import {
  selectFormInitialValues,
  formSubmission,
  createFormName,
  getCurrentFormValueByFieldName
} from '../../../redux/modules/form/selectors';

const CreateOutboundIdentifiersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(OutboundIdentifiersForm);

export function mapStateToProps(state) {
  return {
    flowIds: selectNonReusableFlows(state),
    channelType: getCurrentFormValueByFieldName(state, 'channelType'),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    flowsFetching: isEntityFetching(state, 'flows'),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateOutboundIdentifiersForm);
