/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifiersDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(() => {});
userHasUpdatePermission.mockImplementation(() => true);

describe('OutboundIdentifiersDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <OutboundIdentifiersDetailsPanel store={store}>
          Child
        </OutboundIdentifiersDetailsPanel>
      )
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
