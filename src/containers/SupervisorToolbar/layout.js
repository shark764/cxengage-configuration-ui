import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { messageSubscribe, messageUnsubscribe } from './windowMessageObservable.js';
import { MutedIconSVG, UnMutedIconSVG, HangUpIconSVG } from 'cx-ui-components';

const HangUpIconSVGWrapper = styled(HangUpIconSVG)`
  margin-left: 10px;
  margin-right: 10px;
`;
const Toolbar = styled.div`
  position: fixed;
  bottom: 0px;
  padding-bottom: 10px;
`;

export default class SupervisorToolbar extends Component {
  componentWillMount() {
    this.props.startSupervisorToolbarSubscriptions();
    messageSubscribe();
  }

  componentWillUnmount() {
    messageUnsubscribe();
  }

  render() {
    return (
      <div id="SupervisorToolbar">
        {!['offline', 'sqsShutDown'].includes(this.props.monitoringStatus) && (
          <Toolbar>
            <HangUpIconSVGWrapper
              id="hangUpButton"
              className="HangUpIconSVG"
              onClick={this.props.requestingHangUp}
              loading={this.props.monitoringStatus === 'connecting'}
              size={40}
            />
            {this.props.monitoringStatus === 'connected' &&
              this.props.userHasBargeAllCallsPermission &&
              (this.props.muted ? (
                <MutedIconSVG id="unmuteButton" onClick={this.props.requestingToggleMute} size={40} />
              ) : (
                <UnMutedIconSVG id="muteButton" onClick={this.props.requestingToggleMute} size={40} />
              ))}
          </Toolbar>
        )}
      </div>
    );
  }
}

SupervisorToolbar.propTypes = {
  startSupervisorToolbarSubscriptions: PropTypes.func.isRequired,
  requestingToggleMute: PropTypes.func.isRequired,
  requestingHangUp: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  twilioEnabled: PropTypes.bool.isRequired,
  monitoringStatus: PropTypes.string.isRequired,
  interactionId: PropTypes.string.isRequired,
  userHasBargeAllCallsPermission: PropTypes.bool.isRequired,
  insideIframe: PropTypes.bool
};
