/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import WhatsappIntegrationsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  userHasUpdatePermission,
  isSaving,
  isEntityFetching,
} from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, createFormName } from '../../../redux/modules/form/selectors';
import { onFormSubmit } from '../../../redux/modules/entities';
import { selectWhatsappApps } from '../../../redux/modules/entities/whatsappIntegrations/selectors';
import { getDigitalChannelsApp } from '../../../redux/modules/entities/chatWidgets/selectors';

const CreateWhatsappIntegrationsForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: (values, dispatch, props) => dispatch(onFormSubmit(values.delete('type'), props)),
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(WhatsappIntegrationsForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    whatsappApps: selectWhatsappApps(state),
    whatsappAppsFetching: isEntityFetching(state, 'whatsappApps'),
    app: getDigitalChannelsApp(state),
    isSaving: isSaving(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
  };
}

export default connect(mapStateToProps)(CreateWhatsappIntegrationsForm);
