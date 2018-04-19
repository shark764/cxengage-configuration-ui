/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { ListsDetailsPanel } from 'cx-ui-components';

import { CONFIRM_ENTITY_CSV_UPLOAD } from '../../ConfirmationDialog/constants.js';

import {
  setSelectedSubEntityId,
  deleteSubEntity,
  downloadCsv,
  uploadCsv,
  setConfirmationDialog
} from '../../../redux/modules/crudEndpoint';

import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSubEntitySaving
} from '../../../redux/modules/crudEndpoint/selectors';

function mapDispatchToProps(dispatch) {
  return {
    openCreateListItemModal: () => dispatch(setSelectedSubEntityId('create')),
    updateSubEntity: subEntityId =>
      dispatch(setSelectedSubEntityId(subEntityId)),
    deleteSubEntity: subEntityId => dispatch(deleteSubEntity(subEntityId)),
    downloadCsv: () => dispatch(downloadCsv()),
    uploadCsv: event =>
      dispatch(setConfirmationDialog(CONFIRM_ENTITY_CSV_UPLOAD, event.target))
  };
}

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  let alertMessage = '';
  let inherited = false;

  if (isInherited(state)) {
    alertMessage = 'This list is inherited and cannot be edited';
    inherited = true;
  }

  if (selectedEntity) {
    return {
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
