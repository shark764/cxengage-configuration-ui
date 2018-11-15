/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import UsersForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isUpdating,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';
import { getUserTenantStatus, getInvitationScenario } from '../../../../redux/modules/entities/users/selectors';
import { selectTenantRoles, selectPlatformRoles } from '../../../../redux/modules/entities/roles/selectors';
import { selectTenantIdentityProviders } from '../../../../redux/modules/entities/identityProviders/selectors';

jest.mock('../../../../redux/modules/entities/identityProviders/selectors');
selectTenantIdentityProviders.mockImplementation(() => []);

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
isUpdating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

jest.mock('../../../../redux/modules/entities/users/selectors');
getUserTenantStatus.mockImplementation(() => 'enabled');
getInvitationScenario.mockImplementation(() => 'update');

jest.mock('../../../../redux/modules/entities/roles/selectors');
selectTenantRoles.mockImplementation(() => []);
selectPlatformRoles.mockImplementation(() => []);

describe('Users Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<UsersForm store={store}>Child</UsersForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
