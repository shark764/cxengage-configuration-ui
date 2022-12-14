/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import RolesDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  getCurrentEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving,
  getEntityParentTenantName,
  isSystemRole
} from '../../../../redux/modules/entities/selectors';
import { getEntityListMembers } from '../../../../redux/modules/entities/listItemSelectors';
import { setSelectedSubEntityId, removeListItem } from '../../../../redux/modules/entities';
import { isUserPlatformAdmin } from '../../../../redux/modules/entities/users/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      permissions: [
        {
          id: 'mockSubEntityId'
        }
      ]
    })
);
getCurrentEntity.mockImplementation(() => 'roles');
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);
getEntityParentTenantName.mockImplementation(() => 'ParentTenantName');
isSystemRole.mockImplementation(() => true);
jest.mock('../../../../redux/modules/entities/users/selectors');
isUserPlatformAdmin.mockImplementation(() => false);

jest.mock('../../../../redux/modules/entities/listItemSelectors');
getEntityListMembers.mockImplementation(() => ['mockListMembers']);

jest.mock('../../../../redux/modules/entities');
removeListItem.mockImplementation(() => 'mockId');
setSelectedSubEntityId.mockImplementation(() => 'mockId');

describe('RolesDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<RolesDetailsPanel store={store}>Child</RolesDetailsPanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
