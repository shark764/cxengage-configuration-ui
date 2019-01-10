/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import GroupsDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  getCurrentEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../../redux/modules/entities/listItemSelectors';
import { getGroupsDependantEntityTableItems } from '../../../../redux/modules/entities/groups/selectors';

jest.mock('../../../../redux/modules/entities/listItemSelectors');
jest.mock('../../../../redux/modules/entities/groups/selectors');
jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: true,
      users: [
        {
          id: 'mockSubEntityId'
        }
      ]
    })
);
getCurrentEntity.mockImplementation(() => 'groups');
getSidePanelTableItems.mockImplementation(() => []);
getGroupsDependantEntityTableItems.mockImplementation(() => []);
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);

jest.mock('../../../../redux/modules/entities');
toggleListItemEntity.mockImplementation(() => 'mockId');
setSelectedSubEntityId.mockImplementation(() => 'mockId');

describe('GroupsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<GroupsDetailsPanel store={store}>Child</GroupsDetailsPanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
