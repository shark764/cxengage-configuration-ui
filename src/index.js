import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SupervisorToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';

const store = configureStore();
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route path="/supervisorToolbar" component={SupervisorToolbar} />
        <Route
          path="/interactionMonitoring"
          component={InteractionMonitoring}
        />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
