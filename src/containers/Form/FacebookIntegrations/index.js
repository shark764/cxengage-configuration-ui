/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import FacebookIntegrationsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  userHasUpdatePermission,
  isCreating,
  isEntityFetching
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { selectFacebookIntegrationsFormInitialValues } from '../../../redux/modules/entities/facebookIntegrations/selectors';
import {
  getDigitalChannelsAppIds,
  getDigitalChannelsApp
} from '../../../redux/modules/entities/chatWidgets/selectors';

const CreateFacebookIntegrationsForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(FacebookIntegrationsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFacebookIntegrationsFormInitialValues(state),
    key: getSelectedEntityId(state),
    handleSubmit: formSubmission,
    isSaving: isCreating(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    digitalChannelsAppsFetching: isEntityFetching(state, 'digitalChannelsApps'),
    digitalChannelsAppIds: getDigitalChannelsAppIds(state),
    app: getDigitalChannelsApp(state),
    fbAppId: getCurrentFormValueByFieldName(state, 'facebookAppId'),
  };
}

export default connect(mapStateToProps)(CreateFacebookIntegrationsForm);
