/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { SidePanelHeader } from 'cx-ui-components';

import * as MODALS from '../ConfirmationDialog/constants.js';

import { unsetSelectedEntityId, setConfirmationDialog, copyCurrentEntity } from '../../redux/modules/entities';
import {
  sidePanelHeader,
  userHasUpdatePermission,
  isInherited,
  shouldDisableField,
} from '../../redux/modules/entities/selectors';

export function mapDispatchToProps(dispatch) {
  let actions = {};
  // TODO: copy button is experimental feature and is feature flagged.
  if (location.hash.includes('alpha')) {
    actions.copy = () => dispatch(copyCurrentEntity());
  }
  return {
    ...actions,
    onClose: () => dispatch(unsetSelectedEntityId()),
    onToggle: () => dispatch(setConfirmationDialog(MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE))
  };
}

export function mapStateToProps(state) {
  return {
    title: sidePanelHeader(state).title,
    createdAt: sidePanelHeader(state).createdAt,
    updatedAt: sidePanelHeader(state).updatedAt,
    toggleStatus: sidePanelHeader(state).toggleStatus,
    userHasUpdatePermission: userHasUpdatePermission(state),
    inherited: isInherited(state),
    disabled: shouldDisableField(state)
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
