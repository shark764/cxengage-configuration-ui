/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import AgentStateMonitoringBulkActionsForm from '../layout';

describe('<AgentStateMonitoringBulkActionsForm />', () => {
  it('renders monitoring bulk actions form', () => {
    const rendered = shallow(
      <AgentStateMonitoringBulkActionsForm
        setBulkAgentDirection={() => {}}
        setBulkAgentPresenceState={() => {}}
        reasonLists={[]}
        supervisorUpdatePermissions={{}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
