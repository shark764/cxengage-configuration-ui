/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import OutboundIdentifiersForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<OutboundIdentifiersForm />', () => {
  let customFlowIds;
  beforeEach(() => {
    customFlowIds = [
      {
        label: 'Outbound Identifier Label Test 1',
        value: 'Outbound Identifier Value Test 1'
      },
      {
        label: 'Outbound Identifier Label Test 2',
        value: 'Outbound Identifier Value Test 2'
      }
    ];
  });
  it('renders', () => {
    const rendered = shallow(
      <OutboundIdentifiersForm
        name="mockName"
        value="mockValue"
        flowId="5216bbf0-9bce-11e8-a818-ae8e8008af1d"
        channelType="voice"
        description="this is a new outbound identifier"
        isSaving={false}
        inherited={false}
        flowIds={customFlowIds}
        initialValues={initialValues}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
