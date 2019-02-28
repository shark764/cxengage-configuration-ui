/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import Entities from './modules/entities';
import UserData from './modules/userData';
import SupervisorToolbar from './modules/supervisorToolbar';
import InteractionMonitoring from './modules/reporting/interactionMonitoring';
import ColumnFilterMenus from './modules/columnFilterMenus';
import UserIdMap from './modules/userIdMap';

const reducer = combineReducers({
  Entities,
  UserData,
  form,
  SupervisorToolbar,
  InteractionMonitoring,
  ColumnFilterMenus,
  UserIdMap
});

export default reducer;
