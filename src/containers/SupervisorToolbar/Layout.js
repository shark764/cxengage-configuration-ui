import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
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

let messageObservableSubscription;
export default class SupervisorToolbar extends Component {
  messageObservable = fromEvent(window, 'message')
    .filter(
      ({ data }) =>
        data.subscription &&
        (data.subscription.topic === 'cxengage/session/sqs-shut-down' ||
          data.subscription.topic === 'cxengage/twilio/device-ready' ||
          data.subscription.topic ===
            'cxengage/interactions/voice/silent-monitor-start' ||
          data.subscription.topic ===
            'cxengage/interactions/voice/silent-monitor-end' ||
          data.subscription.topic ===
            'cxengage/interactions/voice/unmute-acknowledged' ||
          data.subscription.topic ===
            'cxengage/interactions/voice/mute-acknowledged' ||
          data.subscription.topic === 'monitorCall')
    )
    .map(event => ({
      topic: event.data.subscription.topic,
      response: event.data.subscription.response
    }));

  componentWillMount() {
    this.props.startSupervisorToolbarSubscriptions();
    messageObservableSubscription = this.messageObservable.subscribe(
      ({ topic, response }) => {
        switch (topic) {
          case 'cxengage/twilio/device/ready':
            !this.props.twilioEnabled && this.props.toggleTwilioEnabled();
            break;
          case 'cxengage/interactions/voice/silent-monitor-start':
            this.props.setSilentMonitoringStatus('connected');
            break;
          case 'cxengage/session/sqs-shut-down':
          case 'cxengage/interactions/voice/silent-monitor-end':
            this.props.setSilentMonitoringStatus('offline');
            break;
          case 'cxengage/interactions/voice/unmute-acknowledged':
          case 'cxengage/interactions/voice/mute-acknowledged':
            this.props.toggleMute();
            break;
          case 'monitorCall':
            const { interactionId, status } = response;
            this.props.setSilentMonitoringStatus(status);
            this.props.setSilentMonitoringInteractionId(interactionId);
            break;
          default:
            break;
        }
      }
    );
  }

  componentWillUnmount() {
    messageObservableSubscription.unsubscribe();
  }

  render() {
    return (
      <div id="SupervisorToolbar">
        {this.props.monitoringStatus !== 'offline' && (
          <Toolbar>
            <HangUpIconSVGWrapper
              className="HangUpIconSVG"
              onClick={() => this.props.requestingHangUp()}
              loading={this.props.monitoringStatus !== 'connected'}
              size={40}
            />
            {this.props.monitoringStatus === 'connected' &&
              (this.props.muted ? (
                <MutedIconSVG
                  onClick={() => this.props.requestingToggleMute()}
                  size={40}
                />
              ) : (
                <UnMutedIconSVG
                  onClick={() => this.props.requestingToggleMute()}
                  size={40}
                />
              ))}
          </Toolbar>
        )}
      </div>
    );
  }
}

SupervisorToolbar.propTypes = {
  requestingToggleMute: PropTypes.func.isRequired,
  requestingHangUp: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  twilioEnabled: PropTypes.bool.isRequired,
  twilioIsDefault: PropTypes.bool.isRequired,
  monitoringStatus: PropTypes.string.isRequired,
  interactionId: PropTypes.string.isRequired,
  setSilentMonitoringInteractionId: PropTypes.func.isRequired,
  toggleTwilioIsDefaultExtension: PropTypes.func.isRequired,
  toggleTwilioEnabled: PropTypes.func.isRequired,
  setSilentMonitoringStatus: PropTypes.func.isRequired
};
