/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import ChatWidgetsDetailsPanel, { mapStateToProps } from '../';
import { getSelectedEntity, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(() => {});
userHasUpdatePermission.mockImplementation(() => true);

describe('ChatWidgetsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ChatWidgetsDetailsPanel store={store}>Child</ChatWidgetsDetailsPanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
