/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/timeout';
import { mockStore, supervisorToolbarMockStore } from '../../../../utils/testUtils';
import { sdkPromise, sdkCall, errorLabel } from '../../../../utils/sdk';
import {
  StartBatchRequest,
  MonitorInteraction,
  HangUpEpic,
  ToggleMuteEpic,
  MonitorInteractionInitialization,
  SqsSessionLost,
  WaitTwilioDeviceReady
} from '../epics';

import {
  selectSupervisorToolbarSilentMonitoringInteractionId,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarTwilioEnabled,
  selectSupervisorToolbarMuted,
  selectTransitionCall,
  selectSessionId
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
// errorLabel.mockReturnValue('');
selectSupervisorToolbarMuted.mockReturnValue(false);
selectSupervisorToolbarSilentMonitoringInteractionId.mockReturnValue('0000-0000-0000-0000');
selectSupervisorToolbarSilentMonitoringStatus.mockReturnValue('connected');
const mockTwilioExtension = { description: 'test-twilio', provider: 'twilio' };
const mockNonTwilioExtension = { description: 'test-non-twilio' };

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
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkPromise.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(monitorInteractionInitialization('0000-0000-0000-0000'));
    MonitorInteractionInitialization(action, mockStore).subscribe(() => {
      expect(sdkPromise).toBeCalled();
      done();
    });
  });
  it('returns HANG_UP_REQUESTED_$ action', done => {
    const action = ActionsObservable.of(monitorInteractionInitialization('0000-0000-0000-0000'));
    MonitorInteractionInitialization(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MonitorInteraction, Twilio is Chosen Extension', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('first we recieve "session/started" and then "twilio/device-ready" then calls the monitor call sdk', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
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
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      { type: 'cxengage/twilio/device-ready' },
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('wait for both twilio and session to be ready', done => {
    selectTransitionCall.mockReturnValueOnce(false);
    selectSessionId.mockReturnValueOnce('');
    selectSupervisorToolbarTwilioEnabled.mockReturnValueOnce(false);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      { type: 'cxengage/twilio/device-ready' },
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('session is ready just wait for twilio', done => {
    selectTransitionCall.mockReturnValueOnce(false);
    selectSessionId.mockReturnValueOnce('mockSessionId');
    selectSupervisorToolbarTwilioEnabled.mockReturnValueOnce(false);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      { type: 'cxengage/twilio/device-ready' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('twilio is ready just wait for session', done => {
    selectTransitionCall.mockReturnValueOnce(false);
    selectSessionId.mockReturnValueOnce('');
    selectSupervisorToolbarTwilioEnabled.mockReturnValueOnce(true);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('twilio and session are ready and its a transition call , waits for call to end', done => {
    selectTransitionCall.mockReturnValueOnce(true);
    selectSessionId.mockReturnValueOnce('mockSessionId');
    selectSupervisorToolbarTwilioEnabled.mockReturnValueOnce(true);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', true, mockTwilioExtension),
      { type: 'cxengage/interactions/voice/silent-monitor-end' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('twilio and session are ready and its not a transition call', done => {
    selectTransitionCall.mockReturnValueOnce(false);
    selectSessionId.mockReturnValueOnce('mockSessionId');
    selectSupervisorToolbarTwilioEnabled.mockReturnValueOnce(true);
    const action = ActionsObservable.from([requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension)]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it("we don't recieve both required events and do not call the sdk (no device-ready)", done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      // {type: 'cxengage/twilio/device-ready'},
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(0);
    done();
  });
  it("we don't recieve both required events and do not call the sdk (no-session-start)", done => {
    selectSessionId.mockReturnValueOnce('');
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
      { type: 'cxengage/twilio/device-ready' }
      // { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(0);
    done();
  });
  it('returns MONITOR_INTERACTION_REQUESTED action', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockTwilioExtension),
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
      requestingMonitorCall('0000-0000-0000-0000', false, mockNonTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('session is not active, wait for the session to start', done => {
    selectSessionId.mockReturnValueOnce('');
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockNonTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(1);
    done();
  });
  it("we don't recieve an event and monitor call sdk should fire", done => {
    selectSessionId.mockReturnValueOnce('');
    selectTransitionCall.mockReturnValueOnce(false);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockNonTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(1);
    done();
  });
  it('transition call waits for silent monitor end before monitor call sdk should fire', done => {
    selectSessionId.mockReturnValueOnce('mockSessionId');
    selectTransitionCall.mockReturnValueOnce(true);
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', true, mockNonTwilioExtension),
      { type: 'cxengage/interactions/voice/silent-monitor-end' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(() => {});
    expect(sdkCall).toHaveBeenCalledTimes(1);
    done();
  });
  it('returns MONITOR_INTERACTION_REQUESTED action', done => {
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockNonTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('catches and handles error from sdk', done => {
    sdkCall.mockReturnValueOnce(new Promise((resolve, reject) => reject('mock response')));
    const action = ActionsObservable.from([
      requestingMonitorCall('0000-0000-0000-0000', false, mockNonTwilioExtension),
      { type: 'cxengage/session/started' }
    ]);
    MonitorInteraction(action, supervisorToolbarMockStore).subscribe(output => {
      expect(output).toMatchSnapshot();
      done();
    });
  });
});

describe('HangUpEpic', () => {
  beforeEach(() => {
    sdkPromise.mockReturnValueOnce(new Promise(resolve => resolve('mock response')));
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
  it('catches and handles error from sdk', done => {
    sdkPromise.mockReturnValueOnce(new Promise((resolve, reject) => reject('mock response')));
    const action = ActionsObservable.of(requestingHangUp());
    HangUpEpic(action, supervisorToolbarMockStore).subscribe(output => {
      expect(output).toMatchSnapshot();
      done();
    });
  });
});

describe('ToggleMuteEpic', () => {
  beforeEach(() => {
    sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
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
  it('catches and handles error from sdk', done => {
    sdkPromise.mockReturnValueOnce(new Promise((resolve, reject) => reject('mock response')));
    const action = ActionsObservable.of(requestingToggleMute());
    ToggleMuteEpic(action, supervisorToolbarMockStore).subscribe(output => {
      expect(output).toMatchSnapshot();
      done();
    });
  });
});

describe('SqsSessionLost', () => {
  it('returns SQS_SHUT_DOWN_ALERTED_$ action', done => {
    global.alert = jest.fn();
    const action = ActionsObservable.of({
      type: 'cxengage/session/sqs-shut-down'
    });
    SqsSessionLost(action, mockStore).subscribe(actualOutputActions => {
      expect(alert).toBeCalled();
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
