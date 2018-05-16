/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/take';
import { mockStore } from 'TestUtils';
import { sdkPromise, sdkCall } from '../../../../utils/sdk';
import {
  StartBatchRequest,
  MonitorInteraction,
  HangUpEpic,
  ToggleMuteEpic,
  EndSessionOnSilentMonitoringEnd,
  MonitorInteractionInitialization
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
  startSupervisorToolbarSubscriptions,
  monitorInteractionInitialization
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

describe('MonitorInteractionInitialization', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(
      monitorInteractionInitialization('0000-0000-0000-0000')
    );
    MonitorInteractionInitialization(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('returns HANG_UP_REQUESTED_$ action', done => {
    const action = ActionsObservable.of(
      monitorInteractionInitialization('0000-0000-0000-0000')
    );
    MonitorInteractionInitialization(action, mockStore).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      }
    );
  });
});

describe('MonitorInteraction, Twilio is Default Extension', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('first we recieve "session/started" and then "twilio/device-ready" then calls the monitor call sdk', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'twilio'),
      { type: 'cxengage/session/started' },
      { type: 'cxengage/twilio/device-ready' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('first we recieve "twilio/device-ready" and then "session/started" then calls the monitor call sdk', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'twilio'),
      { type: 'cxengage/twilio/device-ready' },
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it("we don't recieve both required events and do not call the sdk", done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'twilio'),
      // {type: 'cxengage/twilio/device-ready'},
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(0);
    done();
  });
  it("we don't recieve both required events and do not call the sdk", done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'twilio'),
      { type: 'cxengage/twilio/device-ready' }
      // { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(0);
    done();
  });
  it('returns MONITOR_INTERACTION_REQUESTED action', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'twilio'),
      { type: 'cxengage/twilio/device-ready' },
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MonitorInteraction, Twilio is not Default Extension', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('we recieve "session/started" then calls the monitor call sdk', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'mockExtension'),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it("we don't recieve the required event and do not call the sdk", done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'mockExtension')
      // {type: 'cxengage/session/started'}
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(0);
    done();
  });
  it('returns MONITOR_INTERACTION_REQUESTED action', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', 'mockExtension'),
      { type: 'cxengage/session/started' }
    ]);
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

describe('EndSessionOnSilentMonitoringEnd', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of({
      type: 'cxengage/interactions/voice/silent-monitor-end'
    });
    EndSessionOnSilentMonitoringEnd(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('returns HANG_UP_REQUESTED_$ action', done => {
    const action = ActionsObservable.of({
      type: 'cxengage/interactions/voice/silent-monitor-end'
    });
    EndSessionOnSilentMonitoringEnd(action, mockStore).subscribe(
      actualOutputActions => {
        expect(actualOutputActions).toMatchSnapshot();
        done();
      }
    );
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
