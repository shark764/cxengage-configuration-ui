/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { RootStyles } from 'cx-ui-components';

import store from './redux/store';

import SupervisorToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';
import CrudEndpointUi from './containers/CrudEndpointUi';

ReactDOM.render(
  <RootStyles>
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route path="/supervisorToolbar" component={SupervisorToolbar} />
          <Route
            path="/interactionMonitoring"
            component={InteractionMonitoring}
          />
          <Route path="/(lists)/" component={CrudEndpointUi} />
        </React.Fragment>
      </Router>
    </Provider>
  </RootStyles>,
  document.getElementById('root')
);
