import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  twilio: {
    enabled: false,
    isDefaultExtension: false
  },
  silentMonitoring: {
    status: 'offline',
    interactionId: 'na'
  },
  muted: true
});

function supervisorToolbarReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_TWILIO_ENABLED:
      return state.setIn(
        ['twilio', 'enabled'],
        !state.getIn(['twilio', 'enabled'])
      );
    case ACTIONS.TOGGLE_TWILIO_IS_DEFAULT_EXTENSION:
      return state.setIn(
        ['twilio', 'isDefaultExtension'],
        !state.getIn(['twilio', 'isDefaultExtension'])
      );
    case ACTIONS.SET_SILENT_MONITORING_STATUS:
      return state.setIn(['silentMonitoring', 'status'], action.status);
    case ACTIONS.SET_SILENT_MONITORING_INTERACTION_ID:
      return state.setIn(
        ['silentMonitoring', 'interactionId'],
        action.interactionId
      );
    case ACTIONS.TOGGLE_MUTE:
      return state.set('muted', !state.get('muted'));
    default:
      return state;
  }
}

export default supervisorToolbarReducer;
