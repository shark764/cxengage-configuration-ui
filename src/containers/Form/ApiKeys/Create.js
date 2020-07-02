/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ApiKeysForm from './layout';
import { formValidation } from './validation';
import { isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import { selectTenantRoles } from '../../../redux/modules/entities/roles/selectors';
import { getInitialCreateFormValues } from '../../../redux/modules/entities/apiKeys/selectors';

const CreateApiKeyForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(ApiKeysForm);

export function mapStateToProps(state) {
  return {
    initialValues: getInitialCreateFormValues(state),
    roles: selectTenantRoles(state),
    isSaving: isCreating(state),
    key: 'create',
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(CreateApiKeyForm);
