/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';

// Reducer
import SupervisorToolbar from '../index';

// initialState and Actions
import { initialState, updateAllOfSupervisorToolbar } from '../index';

describe('SupervisorToolbar reducer snapshots', () => {
  it('returns the correct initial state', () => {
    expect(SupervisorToolbar(initialState, {})).toMatchSnapshot();
  });

  it('dispatches cxengage/twilio/device-ready', () => {
    const mockInitialState = fromJS({
      twilio: { enabled: false }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/twilio/device-ready'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/interactions/voice/silent-monitor-start', () => {
    const mockInitialState = fromJS({
      silentMonitoring: { status: 'offline' }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/interactions/voice/silent-monitor-start'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/session/started', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: false,
        activeSession: false
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/session/started'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/session/sqs-shut-down on a non transition call', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: false
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/session/sqs-shut-down'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/session/sqs-shut-down on a transition call', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: true
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/session/sqs-shut-down'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/interactions/voice/silent-monitor-end on a non transition call', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: false
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/interactions/voice/silent-monitor-end'
      })
    ).toMatchSnapshot();
  });

  it('dispatches TRANSITION_CALL_ENDING', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: true
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'TRANSITION_CALL_ENDING'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/interactions/voice/silent-monitor-end on a transition call', () => {
    const mockInitialState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000',
        transitionCall: false
      }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/interactions/voice/silent-monitor-end'
      })
    ).toMatchSnapshot();
  });

  it('dispatches monitorCall', () => {
    const mockInitialState = fromJS({
      silentMonitoring: { status: 'offline', interactionId: 'na' }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'MONITOR_INTERACTION_REQUESTED',
        interactionId: '0000-0000-0000-0000'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/interactions/voice/unmute-acknowledged', () => {
    const mockInitialState = fromJS({
      muted: true
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/interactions/voice/unmute-acknowledged'
      })
    ).toMatchSnapshot();
  });

  it('dispatches cxengage/interactions/voice/mute-acknowledged', () => {
    const mockInitialState = fromJS({
      muted: true
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'cxengage/interactions/voice/mute-acknowledged'
      })
    ).toMatchSnapshot();
  });

  it('dispatches REQUESTING_MONITOR_CALL', () => {
    const mockInitialState = fromJS({
      silentMonitoring: { status: 'offline', interactionId: 'na' }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'REQUESTING_MONITOR_CALL'
      })
    ).toMatchSnapshot();
  });

  it('dispatches MONITOR_INTERACTION_INITIALIZATION', () => {
    const mockInitialState = fromJS({
      silentMonitoring: { status: 'offline', interactionId: 'na' }
    });
    expect(
      SupervisorToolbar(mockInitialState, {
        type: 'MONITOR_INTERACTION_INITIALIZATION'
      })
    ).toMatchSnapshot();
  });
  it('dispatches UPDATE_SUPERVISOR_TOOLBAR_STATE', () => {
    const mockInitialState = fromJS({
      silentMonitoring: { status: 'offline', interactionId: 'na' }
    });
    const updatedState = fromJS({
      silentMonitoring: {
        status: 'connected',
        interactionId: '0000-0000-0000-0000'
      }
    });
    expect(
      SupervisorToolbar(
        mockInitialState,
        updateAllOfSupervisorToolbar(updatedState)
      )
    ).toMatchSnapshot();
  });
});
