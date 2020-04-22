/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import IntegrationsDetailsPanel from '../layout';

describe('<IntegrationsDetailsPanel />', () => {
  it('renders integrations detailsPanel', () => {
    const rendered = shallow(<IntegrationsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
