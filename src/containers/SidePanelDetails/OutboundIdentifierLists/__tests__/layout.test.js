/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifierListsDetailsPanel from '../layout';

describe('OutboundIdentifierListsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <OutboundIdentifierListsDetailsPanel
          store={store}
          userHasUpdatePermission={true}
          id={'mockId'}
          className={'mockClassName'}
          item={{
            name: 'mockName',
            value: 'mockValue',
            flowId: '0000-0000-0000-0000',
            channelType: 'mockChannel',
            description: 'mockDescription'
          }}
        >
          Child
        </OutboundIdentifierListsDetailsPanel>
      )
    ).toMatchSnapshot();
  });
  it('renders without update permissions', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <OutboundIdentifierListsDetailsPanel
          store={store}
          userHasUpdatePermission={false}
          id={'mockId'}
          className={'mockClassName'}
          item={{
            name: 'mockName',
            value: 'mockValue',
            flowId: '0000-0000-0000-0000',
            channelType: 'mockChannel',
            description: 'mockDescription'
          }}
        >
          Child
        </OutboundIdentifierListsDetailsPanel>
      )
    ).toMatchSnapshot();
  });
});
