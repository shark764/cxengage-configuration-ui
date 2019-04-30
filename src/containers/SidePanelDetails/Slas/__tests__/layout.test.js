/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import SlasDetailsPanel from '../layout';

describe('<SlasDetailsPanel />', () => {
  it('renders slas detailsPanel', () => {
    const rendered = shallow(<SlasDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
