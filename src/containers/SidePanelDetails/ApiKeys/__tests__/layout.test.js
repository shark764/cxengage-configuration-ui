/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ApiKeysDetailsPanel from '../layout';

describe('<ApiKeysDetailsPanel />', () => {
  it('renders apiKeys detailsPanel', () => {
    const rendered = shallow(<ApiKeysDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
