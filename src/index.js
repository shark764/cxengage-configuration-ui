/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

import RootStyles from './containers/RootStyles';

import store from './redux/store';

import Login from './containers/Login';
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
        <Login>
          <RootStyles>
            <Fragment>
              <Route path="/interactionMonitoring" component={InteractionMonitoring} />
              <Route path="/betaFeatures" component={BetaFeatures} />
              <Route path="/configuration/:entityName" component={CrudEndpointUi} />
            </Fragment>
          </RootStyles>
        </Login>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
