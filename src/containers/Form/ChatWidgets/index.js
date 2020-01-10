/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ChatWidgetsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isSaving,
  isEntityFetching,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import {
  selectChatWidgetFormInitialValues,
  getDigitalChannelsAppIds,
  getDigitalChannelsApp,
  getDisplayStyleIsButton
} from '../../../redux/modules/entities/chatWidgets/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateChatWidgetsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ChatWidgetsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectChatWidgetFormInitialValues(state),
    key: getSelectedEntityId(state),
    chatWidgetId: getSelectedEntityId(state),
    disabled: isSaving(state) || !userHasUpdatePermission(state),
    digitalChannelsAppsFetching: isEntityFetching(state, 'digitalChannelsApps'),
    digitalChannelsAppIds: getDigitalChannelsAppIds(state),
    app: getDigitalChannelsApp(state),
    displayStyleIsButton: getDisplayStyleIsButton(state)
  };
}

export default connect(mapStateToProps)(CreateChatWidgetsForm);
