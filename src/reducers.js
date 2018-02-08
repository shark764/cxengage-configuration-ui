import { combineReducers } from 'redux-immutable';
import SupervisorToolbar from './containers/SupervisorToolbar/reducer';
import InteractionMonitoring from './containers/InteractionMonitoring/reducer';

const appReducer = combineReducers({
  SupervisorToolbar,
  InteractionMonitoring
});

export default appReducer;
