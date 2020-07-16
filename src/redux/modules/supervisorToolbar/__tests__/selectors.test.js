/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import * as sel from '../selectors';
import { fromJS } from 'immutable';

describe('selectSupervisorToolbarMuted', () => {
  it('returns true if toolbar is muted', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        muted: true
      }
    });
    expect(sel.selectSupervisorToolbarMuted(initialState)).toEqual(true);
  });
  it('returns false if toolbar is unmuted', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        muted: false
      }
    });
    expect(sel.selectSupervisorToolbarMuted(initialState)).toEqual(false);
  });
});

describe('selectSupervisorToolbarTwilioEnabled', () => {
  it('returns true if twilio is enabled', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        twilio: { enabled: true }
      }
    });
    expect(sel.selectSupervisorToolbarTwilioEnabled(initialState)).toEqual(true);
  });
  it('returns false if twilio is not enabled', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        twilio: { enabled: false }
      }
    });
    expect(sel.selectSupervisorToolbarTwilioEnabled(initialState)).toEqual(false);
  });
});

describe('selectSupervisorToolbarSilentMonitoringStatus', () => {
  it('returns the monitoring status', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: { status: 'offline' }
      }
    });
    expect(sel.selectSupervisorToolbarSilentMonitoringStatus(initialState)).toEqual(expect.any(String));
    expect(sel.selectSupervisorToolbarSilentMonitoringStatus(initialState)).toMatchSnapshot();
  });
});

describe('selectTransitionCall', () => {
  it('returns false if the call is a transition call', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: {
          transitionCall: false
        }
      }
    });
    expect(sel.selectTransitionCall(initialState)).toEqual(false);
  });
  it('returns true if the call is a transition call', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: {
          transitionCall: true
        }
      }
    });
    expect(sel.selectTransitionCall(initialState)).toEqual(true);
  });
});

describe('isSessionActive', () => {
  it('returns false if session is not active', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: {
          activeSession: false
        }
      }
    });
    expect(sel.isSessionActive(initialState)).toEqual(false);
  });
  it('returns true if session is active', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: {
          activeSession: true
        }
      }
    });
    expect(sel.isSessionActive(initialState)).toEqual(true);
  });
});

describe('selectSupervisorToolbarSilentMonitoringInteractionId', () => {
  it('returns the monitoring status', () => {
    const initialState = fromJS({
      SupervisorToolbar: {
        silentMonitoring: { interactionId: '0000-0000-0000-0000' }
      }
    });
    expect(sel.selectSupervisorToolbarSilentMonitoringInteractionId(initialState)).toEqual(expect.any(String));
    expect(sel.selectSupervisorToolbarSilentMonitoringInteractionId(initialState)).toMatchSnapshot();
  });
});
