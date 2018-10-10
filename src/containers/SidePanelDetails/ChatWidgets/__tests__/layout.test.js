/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ChatWidgetsDetailsPanel from '../layout';

describe('<ChatWidgetsDetailsPanel />', () => {
  let customItem;
  beforeEach(() => {
    customItem = {
      name: 'mockName'
    };
  });
  it('renders chatWidgets detailsPanel', () => {
    const rendered = shallow(
      <ChatWidgetsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders chatWidgets detailsPanel with no update permision', () => {
    const rendered = shallow(
      <ChatWidgetsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
