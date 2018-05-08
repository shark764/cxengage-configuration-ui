/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from 'TestUtils';
import { sdkPromise, sdkCall } from '../../../../utils/sdk';
import { createStore } from 'redux';
import {
  StartBatchRequest,
  MonitorInteraction,
  HangUpEpic,
  ToggleMuteEpic
} from '../epics';

import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarMuted
} from '../selectors';

import {
  requestingToggleMute,
  requestingMonitorCall,
  requestingHangUp,
  startSupervisorToolbarSubscriptions
} from '../index';

jest.mock('../../../../utils/sdk');
jest.mock('../selectors');
selectSupervisorToolbarMuted.mockReturnValue(false);
selectSupervisorToolbarSilentMonitoringInteractionId.mockReturnValue(
  '0000-0000-0000-0000'
);
selectSupervisorToolbarSilentMonitoringStatus.mockReturnValue('connected');

describe('StartBatchRequest', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(startSupervisorToolbarSubscriptions());
    StartBatchRequest(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('returns SUPERVISOR_TOOLBAR_SUBSCRIPTIONS_ADDED_$ action', done => {
    const action = ActionsObservable.of(startSupervisorToolbarSubscriptions());
    StartBatchRequest(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MonitorInteraction', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(
      requestingMonitorCall('0000-0000-0000-0000')
    );
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('returns MONITOR_INTERACTION_REQUESTED action', done => {
    const action = ActionsObservable.of(
      requestingMonitorCall('0000-0000-0000-0000')
    );
    MonitorInteraction(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('HangUpEpic', () => {
  beforeEach(() => {
    sdkPromise.mockReturnValue(
      new Promise(resolve => resolve('mock response'))
    );
  });
  afterEach(() => {
    sdkPromise.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(requestingHangUp());
    HangUpEpic(action, mockStore).subscribe(() => {
      expect(sdkPromise).toBeCalled();
      done();
    });
  });
  it('returns HANG_UP_REQUESTED_$ action', done => {
    const action = ActionsObservable.of(requestingHangUp());
    HangUpEpic(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('ToggleMuteEpic', () => {
  beforeEach(() => {
    sdkPromise.mockReturnValue(
      new Promise(resolve => resolve('mock response'))
    );
  });
  afterEach(() => {
    sdkPromise.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(requestingToggleMute());
    ToggleMuteEpic(action, mockStore).subscribe(() => {
      expect(sdkPromise).toBeCalled();
      done();
    });
  });
  it('returnsTOGGLE_MUTE_REQUESTED_$ action when muted', done => {
    const action = ActionsObservable.of(requestingToggleMute());
    selectSupervisorToolbarMuted.mockReturnValue(true);
    ToggleMuteEpic(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('returnsTOGGLE_MUTE_REQUESTED_$ action when unmuted', done => {
    const action = ActionsObservable.of(requestingToggleMute());
    selectSupervisorToolbarMuted.mockReturnValue(false);
    ToggleMuteEpic(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
