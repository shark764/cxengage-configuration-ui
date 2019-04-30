/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifiersDetailsPanel from '../';

describe('OutboundIdentifiersDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(<OutboundIdentifiersDetailsPanel store={store}>Child</OutboundIdentifiersDetailsPanel>)
    ).toMatchSnapshot();
  });
});
