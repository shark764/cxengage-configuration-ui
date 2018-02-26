import { combineReducers } from 'redux-immutable';
import SupervisorToolbar from './containers/SupervisorToolbar/reducer';
import InteractionMonitoring from './containers/InteractionMonitoring/reducer';
import CheckboxFilterMenu from './containers/CheckboxFilterMenu/reducer';

const appReducer = combineReducers({
  SupervisorToolbar,
  InteractionMonitoring,
  CheckboxFilterMenu
});

export default appReducer;
