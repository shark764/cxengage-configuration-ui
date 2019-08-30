/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import AgentStateMonitoringBulkActionsFormLayout from './layout';
import { getCurrentEntity, userHasPermissions } from '../../../redux/modules/entities/selectors';
import {
  setBulkAgentDirection,
  setBulkAgentPresenceState
} from '../../../redux/modules/reporting/agentStateMonitoring';
import { selectPresenceReasonLists } from '../../../redux/modules/reporting/agentStateMonitoring/selectors';

export const createFormName = state => ({ form: `${getCurrentEntity(state)}:bulk` });

const AgentStateMonitoringBulkActionsForm = compose(
  connect(createFormName),
  reduxForm({
    destroyOnUnmount: true
  })
)(AgentStateMonitoringBulkActionsFormLayout);

export function mapStateToProps(state) {
  return {
    reasonLists: selectPresenceReasonLists(state),
    supervisorUpdatePermissions: {
      direction: userHasPermissions(state, ['MANAGE_ALL_USERS_DIRECTION']),
      state: userHasPermissions(state, ['MANAGE_ALL_USER_STATE'])
    },
    key: `${getCurrentEntity(state)}:bulk`
  };
}

export const actions = { setBulkAgentDirection, setBulkAgentPresenceState };

export default connect(mapStateToProps, actions)(AgentStateMonitoringBulkActionsForm);
