/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import reducer from './reducers';

const composeEnhancers = composeWithDevTools({
  name: window.location.hash === '#/supervisorToolbar' ? 'Cx Supervisor Toolbar' : 'Cx Configuration'
});
export default createStore(reducer, composeEnhancers(applyMiddleware(createEpicMiddleware(rootEpic))));
