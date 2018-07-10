/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import SupervisorToolbar, { mapStateToProps } from '../';
jest.mock('../../../redux/store.js', () => jest.fn());

// Mock all the required selectors
jest.mock('../../../redux/modules/supervisorToolbar/selectors', () => ({
  selectSupervisorToolbarMuted: () => true,
  selectSupervisorToolbarTwilioEnabled: () => true,
  selectSupervisorToolbarTwilioIsDefaultExtension: () => true,
  selectSupervisorToolbarSilentMonitoringStatus: () => 'conected',
  selectSupervisorToolbarSilentMonitoringInteractionId: () =>
    'mockInteractionId'
}));
jest.mock(
  '../../../redux/modules/reporting/interactionMonitoring/selectors',
  () => ({
    userHasBargeAllCallsPermission: () => true
  })
);

describe('Supervisor Toolbar Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    shallow(<SupervisorToolbar store={store}>Child</SupervisorToolbar>);
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
