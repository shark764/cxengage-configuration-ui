/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import DispatchMappingsForm from './layout';
import { formValidation } from './validation';
import { selectNonReusableFlows, selectVersionsFromFlow } from '../../../redux/modules/entities/flows/selectors';
import { selectIntegrations } from '../../../redux/modules/entities/integrations/selectors';
import {
  currentMappingValue,
  getDispatchMappingValue,
  getDispatchMappings,
  selectDispatchMappingsFormInitialValues
} from '../../../redux/modules/entities/dispatchMappings/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const CreateDispatchMappingsForm = compose(
  connect(state => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(DispatchMappingsForm);

export function mapStateToProps(state) {
  return {
    mappingValue: currentMappingValue(state),
    flowIds: selectNonReusableFlows(state),
    integrationElements: selectIntegrations(state),
    initialValues: selectDispatchMappingsFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    dispatchValues: getDispatchMappingValue(state),
    allDispatchMappings: getDispatchMappings(state),
    selectVersionsForSelectedFlow: selectVersionsFromFlow(state)
  };
}

export default connect(mapStateToProps)(CreateDispatchMappingsForm);
