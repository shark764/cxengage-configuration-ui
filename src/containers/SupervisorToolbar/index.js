import React, { Component } from 'react';
import styled from 'styled-components';

import { MutedIconSVG,UnMutedIconSVG,HangUpIconSVG } from 'cx-ui-components';

const BottomBar = styled.h2`
  position: fixed;
  bottom: 0px;
`;

class SilentMonitoringToolbar extends Component {
  constructor() {
    super();
    this.state = {
      twilioEnabled: false,
      silentMonitoring: {},
      muted: false,
    };
  }

  componentDidMount() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'webpackOk') {
        return;
      } else if (event.data.subscription !== undefined) {
        const error = event.data.subscription.err;
        const topic = event.data.subscription.topic;
        const response = event.data.subscription.response;

        if (error) {
          console.error(error);
        } else {
          switch(topic) {
            case 'cxengage/session/extension-list': {
              if (response.extensions && response.extensions.length) {
                const defaultExtension = response.extensions[0];
                this.setState({
                  defaultExtensionIsTwilio: defaultExtension.type === 'webrtc' && defaultExtension.provider === 'twilio'
                });
              } else {
                console.error('No extensions to use for silent monitoring');
              }
              break;
            }
            case 'cxengage/twilio/device-ready': {
              if (!this.state.twilioEnabled) {
                this.setState({ twilioEnabled: true });
                if (this.state.silentMonitoring && this.state.silentMonitoring.status === 'startingTwilio') {
                  this.silentMonitor();
                }
              }
              break;
            }
            case 'cxengage/session/state-change-request-acknowledged': {
              if (response.state === 'notready') {
                if (this.state.silentMonitoring) {
                  if (this.state.defaultExtensionIsTwilio === true) {
                    if (this.state.twilioEnabled) {
                      this.silentMonitor();
                    } else {
                      this.setState({
                        silentMonitoring: Object.assign(this.state.silentMonitoring, { status: 'startingTwilio' })
                      });
                    }
                  } else if (this.state.defaultExtensionIsTwilio === false) {
                    this.silentMonitor();
                  } else {
                    console.error('Default extension has not been set in state yet')
                  }
                } else {
                  console.warn('State set to not ready, but there is no silent monitoring in progress');
                }
              }
              break;
            }
            case 'cxengage/interactions/voice/silent-monitor-start': {
              this.setState({
                silentMonitoring: Object.assign(this.state.silentMonitoring, { status: 'connected' })
              });
              break;
            }
            case 'cxengage/interactions/voice/silent-monitor-end': {
              this.setState({
                silentMonitoring: Object.assign(this.state.silentMonitoring, { status: 'endingSession' })
              });
              window.parent.postMessage({
                module: 'authentication',
                command: 'logout',
                data: {}
              }, '*');
              break;
            }
            case 'cxengage/session/sqs-shut-down': {
              this.setState({ silentMonitoring: {}});
              break;
            }
            default: {
              break;
            }
          }
        }
      } else if (event.data.module === 'monitorCall') {
        this.setState({ silentMonitoring: event.data.data });
      } else if (event.data.module === 'angularIsReady') {
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/session/extension-list' }, '*');
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/twilio/device-ready' }, '*');
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/session/state-change-request-acknowledged' }, '*');
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/interactions/voice/silent-monitor-start' }, '*');
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/interactions/voice/silent-monitor-end' }, '*');
        window.parent.postMessage({ module: 'subscribe', command: 'cxengage/session/sqs-shut-down' }, '*');
      }
    }, false);
  }

  silentMonitor = () => {
    window.parent.postMessage({
      module: 'interactions.voice',
      command: 'silentMonitor',
      data: { interactionId: this.state.silentMonitoring.interactionId }
    }, '*');
    this.setState({
      silentMonitoring: Object.assign(this.state.silentMonitoring, { status: 'connectingToInteraction' })
    });
  }

  hangUp = () => {
    if (this.state.silentMonitoring !== undefined) {
      window.parent.postMessage({
        module: 'interactions.voice',
        command: 'resourceRemove',
        data: { interactionId: this.state.silentMonitoring.interactionId },
      },'http://localhost:3001');
    }
  }

  toggleMute = () => {
    this.setState({muted: !this.state.muted});
    console.log('TODO: flow work needs to be completed for this to work');
    // if (this.state.silentMonitoring !== undefined) {
    //   window.parent.postMessage({
    //     module: 'interactions.voice',
    //     command: 'resourceMute',
    //     data: { interactionId: this.state.silentMonitoring.interactionId },
    //   }, 'http://localhost:3001');
    // }
  }

  render() {
    return (
      <div id="silentMonitoringToolbar">
        {
          this.state.silentMonitoring.status !== undefined &&
          <BottomBar>
            <HangUpIconSVG onClick={this.hangUp} loading={this.state.silentMonitoring.status !== 'connected'} width="40px" style={{display: 'inline-block', width: '40px', marginRight: '10px',marginLeft: '10px'}}/>
            {this.state.silentMonitoring.status === 'connected' && 
              (this.state.muted? <UnMutedIconSVG onClick={this.toggleMute} width="40px" style={{display: 'inline-block', width: '40px'}}/> :
              <MutedIconSVG onClick={this.toggleMute} width="40px" style={{display: 'inline-block', width: '40px'}}/>)
              }
          </BottomBar>
        }
      </div>
    );
  }
}

export default SilentMonitoringToolbar;
