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
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { getEntityListMembers, getListSize } from '../../../../redux/modules/entities/roles/selectors';
import { setSelectedSubEntityId, removeListItem } from '../../../../redux/modules/entities';

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

jest.mock('../../../../redux/modules/entities/roles/selectors');
getEntityListMembers.mockImplementation(() => ['mockListMembers']);
getListSize.mockImplementation(() => 0);

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
