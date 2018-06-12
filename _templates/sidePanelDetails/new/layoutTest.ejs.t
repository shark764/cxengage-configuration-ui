---
to: src/containers/SidePanelDetails/<%= name %>/__tests__/Layout.test.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import { shallow } from 'enzyme';
import <%= name %>SidePanelDetailsLayout from '../Layout';

describe('<%= name %>SidePanelDetailsLayout Layout', () => {
  it('renders ', () => {
    const component = shallow(<<%= name %>SiePanelDetailsLayout />);
    expect(component).toMatchSnapshot();
  });
});
