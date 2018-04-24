import React from 'react';
import { connect } from 'react-redux';
import {
  selectSupervisorToolbarMuted,
  selectSupervisorToolbarTwilioEnabled,
  selectSupervisorToolbarTwilioIsDefaultExtension,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarSilentMonitoringInteractionId
} from '../../redux/modules/supervisorToolbar/selectors';
import { startSupervisorToolbarSubscriptions } from '../../redux/modules/supervisorToolbar';
import {
  toggleTwilioEnabled,
  toggleMute,
  toggleTwilioIsDefaultExtension,
  setSilentMonitoringStatus,
  requestingToggleMute,
  requestingHangUp,
  requestingMonitorCall,
  setSilentMonitoringInteractionId
} from '../../redux/modules/supervisorToolbar';

import Layout from './Layout';

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
    requestingToggleMute: () => dispatch(requestingToggleMute()),
    toggleMute: () => dispatch(toggleMute()),
    requestingHangUp: () => dispatch(requestingHangUp()),
    setSilentMonitoringInteractionId: interactionId =>
      dispatch(setSilentMonitoringInteractionId(interactionId)),
    startSupervisorToolbarSubscriptions: () =>
      dispatch(startSupervisorToolbarSubscriptions()),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
