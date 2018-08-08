/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import ListsDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSubEntitySaving
} from '../../../../redux/modules/entities/selectors';
const mockSelectedEntity = fromJS({
  name: 'mock list name',
  shared: true,
  listType: {
    name: 'mock list type name',
    fields: [
      {
        type: "string",
        name: "reasonName",
        label: "Reason Name",
        required: true
      },
    ],
  },
  items: [
    {
      reasonName: "Test 1",
      reasonCode: 101,
      description: "Nothing"
    },
  ],
});
jest.mock('../../../../redux/modules/entities/selectors', () => ({
  getSelectedEntity: () => mockSelectedEntity,
  userHasUpdatePermission: () => true,
  isInherited: () => true,
  isSubEntitySaving: () => true
}));

describe('ListsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <ListsDetailsPanel store={store}>
          Child
        </ListsDetailsPanel>
      )
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
