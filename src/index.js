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

import Login from './containers/Login';
import Navigation from './containers/Navigation';
import SupervisorToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';
import BetaFeatures from './containers/BetaFeatures';
import CrudEndpointUi from './containers/CrudEndpointUi';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* Branding is not required for SupervisorToolbar and we do not want to display the loading spinner for it */}
        <Route path="/supervisorToolbar" component={SupervisorToolbar} />
          <RootStyles>
            <Fragment>
              <Navigation />
              <Route exact path="/" component={Login} />
              <Route path="/interactionMonitoring" component={PrivateRoute(InteractionMonitoring)} />
              <Route path="/betaFeatures" component={PrivateRoute(BetaFeatures)} />
              <Route path="/configuration/:entityName" component={PrivateRoute(CrudEndpointUi)} />
            </Fragment>
          </RootStyles>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
