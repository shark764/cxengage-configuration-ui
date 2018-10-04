/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from 'TestUtils';
import AddMemberToList, { mapStateToProps, actions } from '../';

jest.mock('../../../redux/modules/entities', () => ({
  setSelectedSubEntityId: () => 'mockId',
  addListItem: () => 'mockListItems',
  toggleEntityListItemActive: () => true
}));
jest.mock('../../../redux/modules/entities/selectors', () => ({
  getSelectedEntityName: () => 'mockName',
  availableEntitiesForList: () => [],
  userHasUpdatePermission: () => true,
  getCurrentEntity: () => {}
}));

describe('AddMemberToList Renders', () => {
  it('renders', () => {
    const rendered = shallow(<AddMemberToList store={mockStore} />);
    expect(rendered).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('onCancel returns setSelectedSubEntityId(undefined)', () => {
    expect(actions.onCancel()).toMatchSnapshot();
  });
});
