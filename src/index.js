/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

import RootStyles from './containers/RootStyles';

import store from './redux/store';

import PrivateRoute from './PrivateRoute';

import LanguageProvider from './containers/LanguageProvider';
import Login from './containers/Login';
import Navigation from './containers/Navigation';
import SupervisorToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';
import AgentStateMonitoring from './containers/AgentStateMonitoring';
import BetaFeatures from './containers/BetaFeatures';
import CrudEndpointUi from './containers/CrudEndpointUi';
import FlowDebugLogs from './containers/FlowDebugLogs';

ReactDOM.render(
  <Provider store={store}>
    <LanguageProvider>
      <Router>
        <Switch>
          {/* Branding is not required for SupervisorToolbar and we do not want to display the loading spinner for it */}
          <Route path="/supervisorToolbar" component={SupervisorToolbar} />
          <RootStyles>
            <Fragment>
              <Route exact path="/" component={Login} />
              <Navigation />
              <Route path="/interactionMonitoring" component={PrivateRoute(InteractionMonitoring)} />
              <Route path="/agentStateMonitoring" component={PrivateRoute(AgentStateMonitoring)} />
              <Route path="/early-access-features" component={PrivateRoute(BetaFeatures)} />
              <Route path="/configuration/:entityName" component={PrivateRoute(CrudEndpointUi)} />
              <Route path="/flowDebugLogs" component={PrivateRoute(FlowDebugLogs)} />
            </Fragment>
          </RootStyles>
        </Switch>
      </Router>
    </LanguageProvider>
  </Provider>,
  document.getElementById('root')
);
