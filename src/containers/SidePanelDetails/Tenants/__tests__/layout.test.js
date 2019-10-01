/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import TenantsDetailsPanel from '../layout';

describe('<TenantsDetailsPanel />', () => {
  it('renders tenants detailsPanel', () => {
    const rendered = shallow(<TenantsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
