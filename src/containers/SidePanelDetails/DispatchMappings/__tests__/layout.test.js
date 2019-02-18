/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispatchMappingsDetailsPanel from '../layout';

describe('<DispatchMappingsDetailsPanel />', () => {
  it('renders dispatchMappings detailsPanel', () => {
    const rendered = shallow(
      <DispatchMappingsDetailsPanel
        className="details-panel"
        children={'Mock Child'}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
