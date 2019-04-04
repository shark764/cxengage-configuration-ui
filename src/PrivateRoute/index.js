import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userIsAuthed } from '../redux/modules/userData/selectors';

export default function PrivateRoute(WrappedComponent) {

  class WrappedRoute extends Component {
    render() {
      return (
          this.props.userIsAuthed === true
            ? <WrappedComponent {...this.props} entityName={this.props.match.params.entityName} />
            : <Redirect to='/' />
      )
    }
  } 

  const mapStateToProps = state => ({
    userIsAuthed: userIsAuthed(state),
  });

  WrappedRoute.propTypes = {
    userIsAuthed: PropTypes.bool.isRequired,
  };
  
  return connect(mapStateToProps)(WrappedRoute);
  
}
