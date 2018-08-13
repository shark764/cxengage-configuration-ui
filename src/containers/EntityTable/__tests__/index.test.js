/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import EntityTable, { mapStateToProps, actions } from '../';

jest.mock('../../../redux/modules/entities');

jest.mock('../../../redux/modules/entities/selectors', () => ({
  getCurrentEntity: () => 'mock current entity',
  userHasCreatePermission: () => 'mock user has create permission'
}));

jest.mock('../selectors', () => ({
  getAllEntities: () => ['mock all entities'],
  getHelpLink: () => 'mock help link'
}));

jest.mock('../config', () => ({
  getTableColumns: () => ['mock table columns'],
  getTitle: () => 'mock entity name'
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
