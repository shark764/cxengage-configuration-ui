import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fromEvent } from 'rxjs/observable/fromEvent';
import PropTypes, { number } from 'prop-types';
import styled from 'styled-components';

import { SliderExpander } from 'cx-ui-components';

import SidePanelHeaderContainer from '../containers/SidePanelHeader';
import SidePanelActionsContainer from '../containers/SidePanelActions';

import { updateSidePanelWidth } from '../redux/modules/crudEndpoint';
import {
  getSidePanelWidth,
  userHasUpdatePermission
} from '../redux/modules/crudEndpoint/selectors';

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
  padding: 10px 14px;
  border-bottom: 1px solid #dadada;
  min-height: 90px;
  height: 90px;
`;

const SidePanelActions = styled(SidePanelActionsContainer)`
  margin-top: auto;
  border-top: 1px solid #dadada;
  padding-right: 50px;
`;

let mouseObservableSubscription;
class SidePanel extends Component {
  mouseObservable = fromEvent(document, 'mousedown')
    .filter(
      event =>
        event.target.id === 'SlidingResizer' ||
        event.target.id === 'SlidingResizerInnerIcon'
    )
    .mergeMap(md =>
      fromEvent(document, 'mousemove')
        .map(mm => {
          mm.preventDefault();
          const left = window.innerWidth - mm.clientX;
          if (left > 550 && left < window.innerWidth) {
            return { left: left };
          } else if (left > window.innerWidth) {
            return { left: window.innerWidth };
          } else {
            return { left: 550 };
          }
        })
        .takeUntil(fromEvent(document, 'mouseup'))
    );

  componentWillMount() {
    mouseObservableSubscription = this.mouseObservable.subscribe(pos =>
      this.props.updateSidePanelWidth(pos.left)
    );
  }
  componentWillUnmount() {
    mouseObservableSubscription.unsubscribe();
  }

  render() {
    return (
      <Fragment>
        <SliderExpander
          rightPageOffset={this.props.slidingWidth}
          id="SlidingResizer"
        />
        <SidePanelDiv slidingWidth={this.props.slidingWidth}>
          <SidePanelHeader
            userHasUpdatePermission={this.props.userHasUpdatePermission}
          />
          {this.props.children}
          {this.props.userHasUpdatePermission && <SidePanelActions />}
        </SidePanelDiv>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  slidingWidth: getSidePanelWidth(state, props),
  userHasUpdatePermission: userHasUpdatePermission(state)
});

function mapDispatchToProps(dispatch) {
  return {
    updateSidePanelWidth: width => dispatch(updateSidePanelWidth(width)),
    dispatch
  };
}

SidePanel.propTypes = {
  id: PropTypes.string,
  slidingWidth: number,
  children: PropTypes.any,
  onClick: PropTypes.func,
  updateSidePanelWidth: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
