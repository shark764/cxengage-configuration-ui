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
import { isBrandingUpdating } from '../redux/modules/entities/branding/selectors';
import { getSelectedEntityId } from '../redux/modules/entities/selectors';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${props => props.size / 2}px);
  left: calc(50% - ${props => props.size / 2}px);
`;

export default function PrivateRoute(WrappedComponent) {
  class WrappedRoute extends Component {
    componentWillMount() {
      if (!isInIframe()) {
        if (this.props.isBrandingUpdating) {
          store.dispatch({
            type: 'FETCH_DATA',
            entityName: 'branding',
            entityId: this.props.selectedEntityId,
            currentEntityName: 'tenants',
            fetchingDependencies: true
          });
        } else {
          store.dispatch(fetchBranding());
        }
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (!isInIframe()) {
        if (this.props.isBrandingUpdating && prevProps.isBrandingUpdating !== this.props.isBrandingUpdating) {
          store.dispatch({
            type: 'FETCH_DATA',
            entityName: 'branding',
            entityId: this.props.selectedEntityId,
            currentEntityName: 'tenants',
            fetchingDependencies: true
          });
        }
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
    userIsAuthed: userIsAuthed(state),
    selectedEntityId: getSelectedEntityId(state),
    isBrandingUpdating: isBrandingUpdating(state)
  });

  WrappedRoute.propTypes = {
    hasStarted: PropTypes.bool.isRequired,
    userIsAuthed: PropTypes.bool.isRequired,
    match: PropTypes.object,
    entityName: PropTypes.string,
    selectedEntityId: PropTypes.string,
    isBrandingUpdating: PropTypes.bool
  };

  return connect(mapStateToProps)(WrappedRoute);
}
