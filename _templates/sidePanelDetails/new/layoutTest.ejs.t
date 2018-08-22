---
to: src/containers/SidePanelDetails/<%= name %>/__tests__/layout.test.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import <%= name %>DetailsPanel from '../layout';

describe('<<%= name %>DetailsPanel />', () => {
  let customItem;
  beforeEach(() => {
    customItem = {
      name: "Test",
      description: "Test",
      type: "Test"
    };
  });
  it('renders <%= name %> detailsPanel', () => {
    const rendered = shallow(
      <<%= name %>DetailsPanel
        id="0000-0000-0000-0000-0000"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders <%= name %> detailsPanel with no update permision', () => {
    const rendered = shallow(
      <<%= name %>DetailsPanel
        id="0000-0000-0000-0000-0000"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
