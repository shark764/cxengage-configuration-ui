/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import MediaDetailsPanel from '../layout';

describe('<MediaDetailsPanel />', () => {
  it('renders media detailsPanel', () => {
    const rendered = shallow(<MediaDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
