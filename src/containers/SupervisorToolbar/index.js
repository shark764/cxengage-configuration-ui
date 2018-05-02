import { connect } from 'react-redux';

import {
  selectSupervisorToolbarMuted,
  selectSupervisorToolbarTwilioEnabled,
  selectSupervisorToolbarTwilioIsDefaultExtension,
  selectSupervisorToolbarSilentMonitoringStatus,
  selectSupervisorToolbarSilentMonitoringInteractionId
} from '../../redux/modules/supervisorToolbar/selectors';

import {
  startSupervisorToolbarSubscriptions,
  requestingToggleMute,
  requestingHangUp
} from '../../redux/modules/supervisorToolbar';

import Layout from './Layout';

export const mapStateToProps = (state, props) => ({
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

const actions = {
  startSupervisorToolbarSubscriptions,
  requestingToggleMute,
  requestingHangUp
};

export default connect(mapStateToProps, actions)(Layout);
