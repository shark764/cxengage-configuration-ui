---
to: src/containers/SidePanelDetails/<%= className %>/__tests__/index.test.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import <%= className %>DetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      type: 'mockType'
    })
);
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);

describe('<%= className %>DetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <<%= className %>DetailsPanel store={store}>
          Child
        </<%= className %>DetailsPanel>
      )
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});