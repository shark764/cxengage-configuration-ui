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

import { userHasBargeAllCallsPermission } from '../../redux/modules/reporting/interactionMonitoring/selectors';

import Layout from './layout';
import { isInIframe } from 'serenova-js-utils/browser';

export const mapStateToProps = (state, props) => ({
  muted: selectSupervisorToolbarMuted(state, props),
  twilioEnabled: selectSupervisorToolbarTwilioEnabled(state, props),
  twilioIsDefault: selectSupervisorToolbarTwilioIsDefaultExtension(state, props),
  monitoringStatus: selectSupervisorToolbarSilentMonitoringStatus(state, props),
  interactionId: selectSupervisorToolbarSilentMonitoringInteractionId(state, props),
  userHasBargeAllCallsPermission: userHasBargeAllCallsPermission(state),
  insideIframe: !isInIframe()
});

const actions = {
  startSupervisorToolbarSubscriptions,
  requestingToggleMute,
  requestingHangUp
};

export default connect(mapStateToProps, actions)(Layout);
