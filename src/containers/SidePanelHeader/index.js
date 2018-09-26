/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import moment from 'moment';

import { SidePanelHeader } from 'cx-ui-components';

import * as MODALS from '../ConfirmationDialog/constants.js';

import { capitalizeFirstLetter } from '../../utils/string';

import { unsetSelectedEntityId, setConfirmationDialog } from '../../redux/modules/entities';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  getSelectedEntityBulkChangeItems
} from '../../redux/modules/entities/selectors';

export function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(unsetSelectedEntityId());
    },
    onToggle: () => {
      dispatch(setConfirmationDialog(MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE));
    }
  };
}

export function mapStateToProps(state) {
  const selectedEntityId = getSelectedEntityId(state);
  if (selectedEntityId && selectedEntityId === 'create') {
    return {
      title: `Creating New ${capitalizeFirstLetter(getCurrentEntity(state)).slice(0, -1)}`
    };
  } else if (selectedEntityId && selectedEntityId === 'bulk') {
    return {
      title: `Bulk Actions: ${getSelectedEntityBulkChangeItems(state).size} Selected`
    };
  } else if (selectedEntityId) {
    // TODO: Add Created and Updated By X
    const selectedEntity = getSelectedEntity(state);
    const dateCreated = moment(selectedEntity.get('created')).format('lll');
    const dateUpdated = moment(selectedEntity.get('updated')).format('lll');
    return {
      title: selectedEntity.get('name'),
      createdAt: `Created on ${dateCreated}`,
      updatedAt: `Updated on ${dateUpdated}`,
      toggleStatus: selectedEntity.get('active'),
      userHasUpdatePermission: userHasUpdatePermission(state),
      inherited: isInherited(state)
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
