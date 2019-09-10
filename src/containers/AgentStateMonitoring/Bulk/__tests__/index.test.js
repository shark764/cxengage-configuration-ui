/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import AgentStateMonitoringBulkActionsForm, { mapStateToProps, createFormName } from '../';
import { getCurrentEntity } from '../../../../redux/modules/entities/selectors';
import {
  selectPresenceReasonLists,
  countBulkSelectedBusyAgents
} from '../../../../redux/modules/reporting/agentStateMonitoring/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getCurrentEntity.mockImplementation(() => 'agentStateMonitoring');

jest.mock('../../../../redux/modules/reporting/agentStateMonitoring/selectors');
selectPresenceReasonLists.mockImplementation(() => ({ id: '0001', name: 'reason-list1' }));
countBulkSelectedBusyAgents.mockImplementation(() => 1);

describe('AgentStateMonitoringBulkActionsForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(<AgentStateMonitoringBulkActionsForm store={store}>Child</AgentStateMonitoringBulkActionsForm>)
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});
