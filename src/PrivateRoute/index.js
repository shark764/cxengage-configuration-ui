import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBranding } from '../redux/modules/entities/branding/actions';
import store from '../redux/store';
import { authenticatedAndBrandingReady, userIsAuthed } from '../redux/modules/userData/selectors';
import { isInIframe } from 'serenova-js-utils/browser';
import styled from 'styled-components';

import { LoadingSpinnerSVG } from 'cx-ui-components';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${props => props.size / 2}px);
  left: calc(50% - ${props => props.size / 2}px);
`;

export default function PrivateRoute(WrappedComponent) {
  class WrappedRoute extends Component {
    componentWillMount() {
      if (!isInIframe()) {
        store.dispatch(fetchBranding());
      }
    }
    render() {
      if (!isInIframe()) {
        return this.props.hasStarted ? (
          <WrappedComponent {...this.props} entityName={this.props.match.params.entityName} />
        ) : (
          <Loading size={120} />
        );
      } else {
        return this.props.userIsAuthed === true ? (
          <WrappedComponent {...this.props} entityName={this.props.match.params.entityName} />
        ) : (
          <Redirect to="/" />
        );
      }
    }
  }

  const mapStateToProps = state => ({
    hasStarted: authenticatedAndBrandingReady(state),
    userIsAuthed: userIsAuthed(state)
  });

  WrappedRoute.propTypes = {
    hasStarted: PropTypes.bool.isRequired,
    userIsAuthed: PropTypes.bool.isRequired,
    match: PropTypes.object,
    entityName: PropTypes.string
  };

  return connect(mapStateToProps)(WrappedRoute);
}
