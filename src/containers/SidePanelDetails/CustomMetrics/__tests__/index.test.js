/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CustomMetricsDetailsPanel from '../';

describe('CustomMetricsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<CustomMetricsDetailsPanel store={store}>Child</CustomMetricsDetailsPanel>)).toMatchSnapshot();
  });
});
