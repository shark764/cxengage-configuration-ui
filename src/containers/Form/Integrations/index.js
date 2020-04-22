/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import IntegrationsForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import {
  selectIntegrationsFormInitialValues,
  selectTwilioRegions
} from '../../../redux/modules/entities/integrations/selectors';

const CreateIntegrationsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(IntegrationsForm);

export function mapStateToProps(state) {
  const properties = getCurrentFormValueByFieldName(state, 'properties');
  return {
    initialValues: selectIntegrationsFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    integrationType: getCurrentFormValueByFieldName(state, 'type'),
    authType: getCurrentFormValueByFieldName(state, 'authType'),
    ctiEnabled: properties && properties.get('ctiEnabled'),
    rtaEnabled: properties && properties.get('rtaEnabled'),
    workItems: properties && properties.get('workItems'),
    regions: selectTwilioRegions(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateIntegrationsForm);
