/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import CustomMetricsDetailsPanel from '../layout';

describe('<CustomMetricsDetailsPanel />', () => {
  it('renders customMetrics detailsPanel', () => {
    const rendered = shallow(<CustomMetricsDetailsPanel children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
