import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Confirmation } from 'cx-ui-components';

const Wrapper = styled.div`
  display: inline-block;
`;

class ConfirmationWrapper extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <Wrapper onClick={this.toggle}>
        {this.state.open && (
          <Confirmation
            confirmBtnCallback={this.props.confirmBtnCallback}
            cancelBtnCallback={this.toggle}
            mainText={this.props.mainText}
            onMaskClick={this.toggle}
          />
        )}
        {this.props.children}
      </Wrapper>
    );
  }
}

ConfirmationWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
  confirmBtnCallback: PropTypes.func.isRequired,
  mainText: PropTypes.string.isRequired
};

export default connect()(ConfirmationWrapper);
