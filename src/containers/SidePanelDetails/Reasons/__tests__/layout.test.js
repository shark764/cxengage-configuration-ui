/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ReasonsDetailsPanel from '../layout';

describe('<ReasonsDetailsPanel />', () => {
  let customItem;
  beforeEach(() => {
    customItem = {
      name: 'Test',
      description: 'Test',
      type: 'Test'
    };
  });
  it('renders reasons detailsPanel', () => {
    const rendered = shallow(
      <ReasonsDetailsPanel
        id="0000-0000-0000-0000-0000"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders reasons detailsPanel with no update permision', () => {
    const rendered = shallow(
      <ReasonsDetailsPanel
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
