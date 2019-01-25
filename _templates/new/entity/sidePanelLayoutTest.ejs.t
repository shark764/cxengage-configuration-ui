---
to: src/containers/SidePanelDetails/<%= className %>/__tests__/layout.test.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import <%= className %>DetailsPanel from '../layout';

describe('<<%= className %>DetailsPanel />', () => {
  it('renders <%= name %> detailsPanel', () => {
    const rendered = shallow(
      <<%= className %>DetailsPanel
        className="details-panel"
        children={'Mock Child'}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
