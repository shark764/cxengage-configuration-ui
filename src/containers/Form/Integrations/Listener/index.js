/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import IntegrationListenerLayout from './layout';
import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import { isSubEntitySaving } from '../../../../redux/modules/entities/selectors';
import {
  subEntityFormSubmission,
  selectIntegrationListenerFormInitialValues
} from '../../../../redux/modules/entities/integrations/selectors';
import { getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import { formValidation } from './validation';

const CreateIntegrationListenerForm = reduxForm({
  form: 'integrationListener:create',
  onSubmit: subEntityFormSubmission,
  validate: formValidation
})(IntegrationListenerLayout);

export function mapStateToProps(state) {
  return {
    initialValues: selectIntegrationListenerFormInitialValues(state),
    isSaving: isSubEntitySaving(state),
    integrationType: getCurrentFormValueByFieldName(state, 'type'),
    key: 'create'
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateIntegrationListenerForm);
