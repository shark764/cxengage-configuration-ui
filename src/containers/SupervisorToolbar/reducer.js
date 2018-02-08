import * as ACTIONS from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  twilioEnabled: false,
  silentMonitoring: undefined,
  muted: false
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_TWILIO_ENABLED:
      return state.set('twilioEnabled', true);
    default:
      return state;
  }
}

export default loginReducer;
