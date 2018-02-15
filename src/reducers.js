import { combineReducers } from 'redux-immutable';
import SupervisorToolbar from './containers/SupervisorToolbar/reducer';
import InteractionMonitoring from './containers/InteractionMonitoring/reducer';
import ColumnsMenu from './containers/ColumnsMenu/reducer';

const appReducer = combineReducers({
  SupervisorToolbar,
  InteractionMonitoring,
  ColumnsMenu
});

export default appReducer;
