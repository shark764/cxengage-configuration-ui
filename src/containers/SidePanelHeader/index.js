/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import moment from 'moment';

import { SidePanelHeader } from 'cx-ui-components';

import * as MODALS from '../ConfirmationDialog/constants.js';

import { entitiesMetaData } from '../../redux/modules/entities/metaData';

import { unsetSelectedEntityId, setConfirmationDialog, copyCurrentEntity } from '../../redux/modules/entities';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  getSelectedEntityBulkChangeItems
} from '../../redux/modules/entities/selectors';
import { getDisplay } from '../../redux/modules/entities/users/selectors';

export function mapDispatchToProps(dispatch, ownProps) {
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
  const selectedEntityId = getSelectedEntityId(state);
  const currentEntity = getCurrentEntity(state);
  if (selectedEntityId && selectedEntityId === 'create') {
    return {
      title: `Creating New ${entitiesMetaData[currentEntity].title}`
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
      title: selectedEntity.get('name') || getDisplay(selectedEntity.toJS()),
      createdAt: `Created on ${dateCreated}`,
      updatedAt: `Updated on ${dateUpdated}`,
      // We convert both values to boolean since each entity could have
      // any of them, this way we avoid getting undefined instead of true/false
      toggleStatus:
        currentEntity !== 'roles'
          ? Boolean(selectedEntity.get('active')) || selectedEntity.get('status') === 'accepted'
          : undefined,
      userHasUpdatePermission: userHasUpdatePermission(state),
      inherited: isInherited(state)
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
