/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import BusinessHoursDetailsPanel from '../layout';

describe('<BusinessHoursDetailsPanel />', () => {
  it('renders businessHours detailsPanel', () => {
    const rendered = shallow(<BusinessHoursDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
