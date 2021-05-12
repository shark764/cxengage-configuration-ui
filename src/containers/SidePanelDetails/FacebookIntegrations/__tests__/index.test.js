/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import FacebookIntegrationsDetailsPanel from '../';

describe('<FacebookIntegrationsDetailsPanel />', () => {
  it('renders FacebookIntegrations detailsPanel', () => {
    const rendered = shallow(<FacebookIntegrationsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
