/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import moment from 'moment';

import { SidePanelHeader } from 'cx-ui-components';

import {
  getSelectedEntity,
  deselectCurrentEntity
} from '../../redux/modules/crudEndpoint';

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(deselectCurrentEntity());
    }
  };
}

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  const dateCreated = moment(selectedEntity.get('created')).format('lll');
  const dateUpdated = moment(selectedEntity.get('updated')).format('lll');

  // TODO: Add Created and Updated By X

  if (selectedEntity) {
    return {
      title: selectedEntity.get('name'),
      createdAt: `Created on ${dateCreated}`,
      updatedAt: `Updated on ${dateUpdated}`,
      toggleStatus: selectedEntity.get('active')
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
