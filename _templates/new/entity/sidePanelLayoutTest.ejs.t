---
to: src/containers/SidePanelDetails/<%= Name %>/__tests__/layout.test.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import <%= Name %>DetailsPanel from '../layout';

describe('<<%= Name %>DetailsPanel />', () => {
  it('renders <%= name %> detailsPanel', () => {
    const rendered = shallow(
      <<%= Name %>DetailsPanel
        className="details-panel"
        children={'Mock Child'}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
