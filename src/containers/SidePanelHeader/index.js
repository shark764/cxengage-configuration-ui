/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import moment from 'moment';

import { SidePanelHeader } from 'cx-ui-components';

import { capitalizeFirstLetter } from '../../utils/string';

import {
  deselectCurrentEntity,
  toggleEntityActive
} from '../../redux/modules/crudEndpoint';
import {
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntity,
  isInherited
} from '../../redux/modules/crudEndpoint/selectors';

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(deselectCurrentEntity());
    },
    onToggle: () => {
      dispatch(toggleEntityActive());
    }
  };
}

function mapStateToProps(state) {
  const selectedEntityId = getSelectedEntityId(state);

  if (selectedEntityId && selectedEntityId === 'create') {
    const currentEntity = getCurrentEntity(state);
    return {
      title: `Creating New ${capitalizeFirstLetter(currentEntity).slice(0, -1)}`
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
      inherited: isInherited(state)
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
