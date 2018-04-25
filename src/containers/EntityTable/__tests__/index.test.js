/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import EntityTable, { mapStateToProps, actions } from '../';

jest.mock('../../../redux/modules/entities', () => ({
  setSelectedEntityCreate: 'mock set selected entity create',
  setSelectedEntityId: 'mock set selected entity id'
}));

jest.mock('../../../redux/modules/entities/selectors', () => ({
  getCurrentEntity: () => 'mock current entity',
  userHasCreatePermission: () => 'mock user has create permission'
}));

jest.mock('../selectors', () => ({
  getAllEntities: () => ['mock all entities']
}));

jest.mock('../config', () => ({
  getHelpLink: () => 'mock help link',
  getTableColumns: () => ['mock table columns']
}));

describe('EntityTable', () => {
  it('renders', () => {
    shallow(<EntityTable store={mockStore} />);
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('maps the redux actions to the object correctly', () => {
    expect(actions).toMatchSnapshot();
  });
});
