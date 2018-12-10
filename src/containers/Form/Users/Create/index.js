/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { onFormSubmit } from '../../../../redux/modules/entities';
import { selectFormInitialValues, createFormName } from '../../../../redux/modules/form/selectors';
import { selectTenantRoles, selectPlatformRoles } from '../../../../redux/modules/entities/roles/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';

const CreateUsersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      return dispatch(onFormSubmit(values, props));
    },
    validate: formValidation,
    destroyOnUnmount: true
  })
)(UsersForm);

export function mapStateToProps(state) {
  return {
    platformRoles: selectPlatformRoles(state),
    tenantRoles: selectTenantRoles(state),
    tenantIdentityProviders: selectTenantIdentityProviders(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateUsersForm);
