/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import OutboundIdentifiersDetailsPanel from '../Layout';

describe('<OutboundIdentifiersDetailsPanel />', () => {
  let customItem;
  beforeEach(() => {
    customItem = {
      name: 'test-1',
      value: 'test 1',
      flowId: '7a11c534-cc2e-11n8-76hd-9440dab8147',
      channelType: 'voice',
      description: 'test item',
    };
  });
  it('renders outboundIdentifiers detailsPanel', () => {
    const rendered = shallow(
      <OutboundIdentifiersDetailsPanel
        id="7a96c534-cc2e-11n8-88b9-9440dab8141"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        openCreateListItemModal={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
