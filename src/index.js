/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import RootStyles from './containers/RootStyles';

import store from './redux/store';

import SupervisorToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';
import CrudEndpointUi from './containers/CrudEndpointUi';

ReactDOM.render(
  <Provider store={store}>
    <RootStyles>
      <Router>
        <React.Fragment>
          <Route path="/supervisorToolbar" component={SupervisorToolbar} />
          <Route
            path="/interactionMonitoring"
            component={InteractionMonitoring}
          />
          <Route path="/configuration/:entityName" component={CrudEndpointUi} />
        </React.Fragment>
      </Router>
    </RootStyles>
  </Provider>,
  document.getElementById('root')
);
