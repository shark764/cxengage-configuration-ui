import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SimpleCaretIconSVG } from 'cx-ui-components';
import { fetchListItems } from '../../redux/modules/entities';
import { getCurrentEntity, getSelectedEntityId } from '../../redux/modules/entities/selectors';

const Wrapper = styled.div`
  display: inline-block;
  position: absolute;
  left: 5px;
  margin-top: 12px;
  cursor: pointer;
`;

const CaretIcon = styled(SimpleCaretIconSVG)`
  display: inline-block;
  margin-left: 15px;
`;

class DetailWrapper extends Component {
  constructor(props) {
    super();
    this.state = {
      open: props.open
    };
  }
  componentDidUpdate({ entityId }) {
    if (entityId !== this.props.entityId && !this.props.autoCloseOverride) {
      this.setState({ open: false });
    }
  }
  toggle = () => {
    this.setState({ open: !this.state.open });
    if (this.props.contains && !this.state.open) {
      this.props.fetchListItems(this.props.entityName, this.props.contains);
    }
  };
  render() {
    return (
      <span>
        <Wrapper data-automation={this.props['data-automation']} onClick={this.toggle}>
          <CaretIcon size={15} direction={this.state.open ? 'up' : 'down'} />
        </Wrapper>
        {!this.state.open && this.props.children[0]}
        {this.state.open &&
          React.Children.map(
            this.props.children,
            (child, index) => (index === 0 ? React.cloneElement(child, { open: this.state.open }) : child)
          )}
      </span>
    );
  }
}

export function mapStateToProps(state, props) {
  return {
    entityName: getCurrentEntity(state),
    entityId: getSelectedEntityId(state)
  };
}

export const actions = {
  fetchListItems
};

DetailWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
  fetchListItems: PropTypes.func,
  entityName: PropTypes.string,
  entityId: PropTypes.string,
  contains: PropTypes.string,
  autoCloseOverride: PropTypes.bool,
  'data-automation': PropTypes.string
};

export default connect(mapStateToProps, actions)(DetailWrapper);
