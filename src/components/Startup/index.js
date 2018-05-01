import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingSpinnerSVG } from 'cx-ui-components';

const Loading = styled(LoadingSpinnerSVG)`
  position: absolute;
  top: calc(50% - ${props => props.size / 2}px);
  left: calc(50% - ${props => props.size / 2}px);
`;

export default class Startup extends Component {
  componentDidMount() {
    this.props.start();
  }

  render() {
    return this.props.hasStarted ? this.props.children : <Loading size={120} />;
  }
}

Startup.propTypes = {
  start: PropTypes.func.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  children: PropTypes.any
};
