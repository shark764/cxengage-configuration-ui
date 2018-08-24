import React, { Component, Fragment } from 'react';
import { subscribe, unsubscribe } from './Observable.js';
import PropTypes, { number } from 'prop-types';
import styled from 'styled-components';

import { SliderExpander } from 'cx-ui-components';

import SidePanelHeaderContainer from '../../containers/SidePanelHeader';
import SidePanelActionsContainer from '../../containers/SidePanelActions';

const SidePanelDiv = styled.div.attrs({
  style: props => ({
    width: props.slidingWidth
  })
})`
  position: absolute;
  right: 0px;
  background: white;
  min-width: 550px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-area: sidePanel;
  border-left: 1px solid #dadada;
  height: 100%;
  box-shadow: -1px 0px 17px -3px rgba(0, 0, 0, 0.5);
`;

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  padding: 10px 14px 16px;
  border-bottom: 1px solid #dadada;
  min-height: 86px;
`;

const SidePanelActions = styled(SidePanelActionsContainer)`
  margin-top: auto;
  border-top: 1px solid #dadada;
  padding-right: 50px;
`;

export default class SidePanelLayout extends Component {
  componentWillMount() {
    subscribe();
  }
  componentWillUnmount() {
    unsubscribe();
  }

  render() {
    return (
      <Fragment>
        <SliderExpander
          rightPageOffset={this.props.slidingWidth}
          id="SlidingResizer"
        />
        <SidePanelDiv slidingWidth={this.props.slidingWidth}>
          <SidePanelHeader />
          {this.props.children}
          {this.props.userHasUpdatePermission && <SidePanelActions />}
        </SidePanelDiv>
      </Fragment>
    );
  }
}

SidePanelLayout.propTypes = {
  id: PropTypes.string,
  slidingWidth: number,
  children: PropTypes.any,
  onClick: PropTypes.func,
  updateSidePanelWidth: PropTypes.func
};
