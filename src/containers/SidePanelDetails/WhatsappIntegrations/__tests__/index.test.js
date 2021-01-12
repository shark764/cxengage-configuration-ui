/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import WhatsappIntegrationsDetailsPanel from '../';

describe('<WhatsappIntegrationsDetailsPanel />', () => {
  it('renders whatsappIntegrations detailsPanel', () => {
    const rendered = shallow(<WhatsappIntegrationsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
