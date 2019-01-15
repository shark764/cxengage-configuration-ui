/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import UsersForm from './layout';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { getUsers, existsPlatformUserByEmail } from '../../../../redux/modules/entities/users/selectors';
import { formValidation } from './validation';
import { onFormSubmit, setSelectedEntityId } from '../../../../redux/modules/entities';
import { selectCreateUserFormInitialValues, createFormName } from '../../../../redux/modules/form/selectors';
import { selectTenantRoles, selectPlatformRoles } from '../../../../redux/modules/entities/roles/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';

const CreateUsersForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: (values, dispatch, props) => {
      return dispatch(onFormSubmit(values, props));
    },
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: true,
    validate: formValidation
  })
)(UsersForm);

export function mapStateToProps(state) {
  return {
    platformRoles: selectPlatformRoles(state),
    tenantRoles: selectTenantRoles(state),
    tenantIdentityProviders: selectTenantIdentityProviders(state),
    initialValues: selectCreateUserFormInitialValues(state),
    isSaving: isCreating(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state),
    tenantUsers: getUsers(state),
    checkPlatformUser: existsPlatformUserByEmail(state)
  };
}

export const actions = {
  setSelectedEntityId
};

export default connect(mapStateToProps, actions)(CreateUsersForm);
