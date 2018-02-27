/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { combineReducers } from 'redux-immutable';

import crudEndpoint from './modules/crudEndpoint';
import SupervisorToolbar from '../containers/SupervisorToolbar/reducer';
import InteractionMonitoring from '../containers/InteractionMonitoring/reducer';
import CheckboxFilterMenu from '../containers/CheckboxFilterMenu/reducer';

const reducer = combineReducers({
  crudEndpoint,
  SupervisorToolbar,
  InteractionMonitoring,
  CheckboxFilterMenu,
});

export default reducer;
