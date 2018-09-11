/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { createStore } from 'redux';
import { fromJS } from 'immutable';

export const mockStore = createStore(state => state);
export const supervisorToolbarMockStore = createStore(state =>
  fromJS({ SupervisorToolbar: {} })
);
