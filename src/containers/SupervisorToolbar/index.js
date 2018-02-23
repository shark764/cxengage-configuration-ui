import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import {
  selectSupervisorToolbarMuted,
  selectSupervisorToolbarTwilioEnabled,
  selectSupervisorToolbarTwilioIsDefaultExtension,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarSilentMonitoringInteractionId
} from './selectors';
import { MutedIconSVG, UnMutedIconSVG, HangUpIconSVG } from 'cx-ui-components';
import {
  toggleTwilioEnabled,
  toggleTwilioIsDefaultExtension,
  setSilentMonitoringStatus,
  toggleMute,
  setSilentMonitoringInteractionId
} from './actions';

class SupervisorToolbar extends Component {
  componentDidMount() {
    window.addEventListener(
      'message',
      event => {
        // console.log("SupervisorToolbar recieved a message", event);
        if (event.data.type === 'webpackOk') {
          return;
        } else if (event.data.subscription !== undefined) {
          const error = event.data.subscription.err;
          const topic = event.data.subscription.topic;
          const response = event.data.subscription.response;

          if (error) {
            console.error(error);
          } else {
            switch (topic) {
              case 'cxengage/session/extension-list': {
                if (response.extensions && response.extensions.length) {
                  const defaultExtension = response.extensions[0];
                  defaultExtension.type === 'webrtc' &&
                    defaultExtension.provider === 'twilio' &&
                    this.props.toggleTwilioIsDefaultExtension();
                } else {
                  console.error('No extensions to use for silent monitoring');
                }
                break;
              }
              case 'cxengage/twilio/device-ready': {
                if (!this.props.twilioEnabled) {
                  this.props.toggleTwilioEnabled();
                  if (this.props.monitoringStatus === 'startingTwilio') {
                    this.silentMonitor();
                  }
                }
                break;
              }
              case 'cxengage/session/state-change-request-acknowledged': {
                if (response.state === 'notready') {
                  if (this.props.monitoringStatus !== 'offline') {
                    if (this.props.twilioIsDefault) {
                      if (this.props.twilioEnabled) {
                        this.silentMonitor();
                      } else {
                        this.props.setSilentMonitoringStatus('startingTwilio');
                      }
                    } else if (!this.props.twilioIsDefault) {
                      this.silentMonitor();
                    } else {
                      console.error(
                        'Default extension has not been set in state yet'
                      );
                    }
                  } else {
                    console.warn(
                      'State set to not ready, but there is no silent monitoring in progress'
                    );
                  }
                }
                break;
              }
              case 'cxengage/interactions/voice/silent-monitor-start': {
                this.props.setSilentMonitoringStatus('connected');
                break;
              }
              case 'cxengage/interactions/voice/silent-monitor-end': {
                this.props.setSilentMonitoringStatus('endingSession');
                window.parent.postMessage(
                  {
                    module: 'authentication',
                    command: 'logout',
                    data: {}
                  },
                  '*'
                );
                break;
              }
              case 'cxengage/session/sqs-shut-down': {
                this.props.setSilentMonitoringStatus('offline');
                break;
              }
              default: {
                break;
              }
            }
          }
        } else if (event.data.module === 'monitorCall') {
          console.warn(event.data.data.interactionId);
          this.props.setSilentMonitoringStatus(event.data.data.status);
          this.props.setSilentMonitoringInteractionId(
            event.data.data.interactionId
          );
        } else if (event.data.module === 'angularIsReady') {
          window.parent.postMessage(
            { module: 'subscribe', command: 'cxengage/session/extension-list' },
            '*'
          );
          window.parent.postMessage(
            { module: 'subscribe', command: 'cxengage/twilio/device-ready' },
            '*'
          );
          window.parent.postMessage(
            {
              module: 'subscribe',
              command: 'cxengage/session/state-change-request-acknowledged'
            },
            '*'
          );
          window.parent.postMessage(
            {
              module: 'subscribe',
              command: 'cxengage/interactions/voice/silent-monitor-start'
            },
            '*'
          );
          window.parent.postMessage(
            {
              module: 'subscribe',
              command: 'cxengage/interactions/voice/silent-monitor-end'
            },
            '*'
          );
          window.parent.postMessage(
            { module: 'subscribe', command: 'cxengage/session/sqs-shut-down' },
            '*'
          );
        }
      },
      false
    );

    // Start subscriptions this container requires
    const subscriptions = [
      'session/extension-list',
      'twilio/device-ready',
      'session/state-change-request-acknowledged',
      'interactions/voice/silent-monitor-start',
      'interactions/voice/silent-monitor-end',
      'session/sqs-shut-down'
    ];
    subscriptions.forEach(sub =>
      window.parent.postMessage(
        { module: 'subscribe', command: `cxengage/${sub}` },
        '*'
      )
    );
  }

  silentMonitor = () => {
    window.parent.postMessage(
      {
        module: 'interactions.voice',
        command: 'silentMonitor',
        data: { interactionId: this.props.interactionId }
      },
      '*'
    );
    this.props.setSilentMonitoringStatus('connectingToInteraction');
  };

  hangUp = () => {
    if (this.props.monitoringStatus === 'connected') {
      window.parent.postMessage(
        {
          module: 'interactions.voice',
          command: 'resourceRemove',
          data: { interactionId: this.props.interactionId }
        },
        '*'
      );
    }
  };

  toggleMute = () => {
    if (this.props.monitoringStatus === 'connected' && !this.props.muted) {
      window.parent.postMessage(
        {
          module: 'interactions.voice',
          command: 'mute',
          data: { interactionId: this.props.interactionId }
        },
        '*'
      );
      this.props.toggleMute();
    } else if (
      this.props.monitoringStatus === 'connected' &&
      this.props.muted
    ) {
      window.parent.postMessage(
        {
          module: 'interactions.voice',
          command: 'unmute',
          data: { interactionId: this.props.interactionId }
        },
        '*'
      );
      this.props.toggleMute();
    }
  };

  render() {
    return (
      <div id="SupervisorToolbar">
        {this.props.monitoringStatus !== 'offline' && (
          <div style={{ position: 'fixed', bottom: '0px' }}>
            <HangUpIconSVG
              onClick={this.hangUp}
              loading={this.props.monitoringStatus !== 'connected'}
              width="40px"
              style={{
                display: 'inline-block',
                width: '40px',
                marginRight: '10px',
                marginLeft: '10px'
              }}
            />
            {this.props.monitoringStatus === 'connected' &&
              (this.props.muted ? (
                <MutedIconSVG
                  onClick={this.toggleMute}
                  width="40px"
                  style={{ display: 'inline-block', width: '40px' }}
                />
              ) : (
                <UnMutedIconSVG
                  onClick={this.toggleMute}
                  width="40px"
                  style={{ display: 'inline-block', width: '40px' }}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  muted: selectSupervisorToolbarMuted(state, props),
  twilioEnabled: selectSupervisorToolbarTwilioEnabled(state, props),
  twilioIsDefault: selectSupervisorToolbarTwilioIsDefaultExtension(
    state,
    props
  ),
  monitoringStatus: selectSupervisorToolbarSilentMonitoringStatus(state, props),
  interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(
    state,
    props
  )
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTwilioEnabled: () => dispatch(toggleTwilioEnabled()),
    toggleTwilioIsDefaultExtension: () =>
      dispatch(toggleTwilioIsDefaultExtension()),
    setSilentMonitoringStatus: status =>
      dispatch(setSilentMonitoringStatus(status)),
    toggleMute: () => dispatch(toggleMute()),
    setSilentMonitoringInteractionId: interactionId =>
      dispatch(setSilentMonitoringInteractionId(interactionId)),
    dispatch
  };
}

SupervisorToolbar.propTypes = {
  // muted: PropTypes.bool.isRequired
  // twilioEnabled: PropTypes.bool.isRequired,
  // twilioIsDefault: PropTypes.bool.isRequired,
  // monitoringStatus: PropTypes.string.isRequired,
  // interactionId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SupervisorToolbar);
