import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SilentMonitoringToolbar from './containers/SupervisorToolbar';
import InteractionMonitoring from './containers/InteractionMonitoring';

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route path="/silentMonitoringToolbar" component={SilentMonitoringToolbar}/>
      <Route path="/interactionMonitoring" component={InteractionMonitoring}/>
    </React.Fragment>
  </Router>,
  document.getElementById('root')
);
