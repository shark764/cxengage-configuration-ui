/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ApiKeysForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isInherited, isUpdating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { getInitialUpdateFormValues } from '../../../redux/modules/entities/apiKeys/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { selectTenantRoles } from '../../../redux/modules/entities/roles/selectors';
import { removeSecretApiKey, deleteApiKey } from '../../../redux/modules/entities/';

const UpdateApiKeyForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    destroyOnUnmount: true,
    validate: formValidation
  })
)(ApiKeysForm);

export function mapStateToProps(state) {
  return {
    update: true,
    initialValues: getInitialUpdateFormValues(state),
    roles: selectTenantRoles(state),
    isSaving: isUpdating(state),
    inherited: isInherited(state),
    key: getSelectedEntityId(state),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export const actions = {
  removeSecretApiKey,
  deleteApiKey
};

export default connect(mapStateToProps, actions)(UpdateApiKeyForm);
