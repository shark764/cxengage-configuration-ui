/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import reducer from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

// Redux Dev Tools
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable */

const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

export default createStore(reducer, enhancer);
