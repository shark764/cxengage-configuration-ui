/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import InteractionMonitoring, { mapStateToProps } from '../';
jest.mock('../../../redux/store.js', () => jest.fn());

// Mock all the required selectors
jest.mock('../../../redux/modules/columnFilterMenus/selectors', () => ({
  selectInteractionMonitoringActiveColumns: () => [true],
  areAllColNotActive: () => false,
  selectTimeFormat: () => true,
  totalRatio: () => []
}));
jest.mock(
  '../../../redux/modules/reporting/interactionMonitoring/selectors',
  () => ({
    selectInteractionMonitoringTableData: () => ({ item1: '', item2: '' }),
    selectInteractionMonitoringSorted: () => true,
    selectInteractionMonitoringExpanded: () => ({}),
    selectInteractionMonitoringSelected: () => 'conected',
    userHasViewAllMonitoredCallsPermission: () => true
  })
);
jest.mock('../../../redux/modules/supervisorToolbar/selectors', () => ({
  selectSupervisorToolbarSilentMonitoringInteractionId: () =>
    '0000-0000-0000-0000',
  selectSupervisorToolbarSilentMonitoringStatus: () => 'mockStatus'
}));
jest.mock('../../../redux/modules/userData/selectors', () => ({
  getCurrentAgentId: () => '0000-0000-0000-0000'
}));

describe('InteractionMonitoring Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    shallow(<InteractionMonitoring store={store}>Child</InteractionMonitoring>);
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
