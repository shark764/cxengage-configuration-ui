/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import ListsDetailsPanel from './layout';

import { CONFIRM_ENTITY_CSV_UPLOAD } from '../../ConfirmationDialog/constants.js';

import {
  setSelectedSubEntityId,
  deleteSubEntity,
  downloadCsv,
  setConfirmationDialog
} from '../../../redux/modules/entities';

import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSubEntitySaving
} from '../../../redux/modules/entities/selectors';

export function mapDispatchToProps(dispatch) {
  return {
    openCreateListItemModal: () => dispatch(setSelectedSubEntityId('create')),
    updateSubEntity: subEntityId => dispatch(setSelectedSubEntityId(subEntityId)),
    deleteSubEntity: subEntityId => dispatch(deleteSubEntity(subEntityId)),
    downloadCsv: () => dispatch(downloadCsv()),
    uploadCsv: event => dispatch(setConfirmationDialog(CONFIRM_ENTITY_CSV_UPLOAD, event.target.files[0]))
  };
}

export function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  let alertMessage = '';
  let inherited = false;

  if (isInherited(state)) {
    alertMessage = 'This list is inherited and cannot be edited';
    inherited = true;
  }

  if (selectedEntity) {
    return {
      id: 'dtpanel-lists',
      listType: selectedEntity.get('listType').get('name'),
      tableItems: selectedEntity.get('items').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      tableFields: selectedEntity.getIn(['listType', 'fields']).toJS(),
      inherited,
      alertMessage,
      isSaving: isSubEntitySaving(state)
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsDetailsPanel);
