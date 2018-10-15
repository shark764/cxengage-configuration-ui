import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CaretIconSVG } from 'cx-ui-components';

const Wrapper = styled.div`
  display: inline-block;
  position: absolute;
  left: 5px;
  margin-top: 12px;
  cursor: pointer;
`;

export class DetailWrapper extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.open
    };
  }
  toggle = () => this.setState({ open: !this.state.open });
  render() {
    return (
      <span>
        <Wrapper onClick={this.toggle}>
          <CaretIconSVG size={15} direction={this.state.open ? 'up' : 'down'} />
        </Wrapper>
        {!this.state.open && this.props.children[0]}
        {this.state.open && this.props.children}
      </span>
    );
  }
}

DetailWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any
};
