/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { ListsDetailsPanel } from 'cx-ui-components';

import { setSelectedSubEntityId } from '../../../redux/modules/crudEndpoint';

import {
  getSelectedEntity,
  userHasUpdatePermission,
  userHasUpdatePermission,
  getSelectedEntity,
  isInherited
} from '../../../redux/modules/crudEndpoint/selectors';

function mapDispatchToProps(dispatch) {
  return {
    openCreateListItemModal: () => dispatch(setSelectedSubEntityId('create')),
    updateSubEntity: subEntityId =>
      dispatch(setSelectedSubEntityId(subEntityId)),
    deleteSubEntity: subEntityId => dispatch(deleteSubEntity(subEntityId))
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

  const tableFields = selectedEntity.getIn(['listType', 'fields']).toJS();
  if (selectedEntity) {
    return {
      listType: selectedEntity.get('listType').get('name'),
      // TODO alertMessage: `TODO: session tenantId vs createdby tenantId`,
      tableItems: selectedEntity.get('items').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      tableFields: selectedEntity.getIn(['listType', 'fields']).toJS(),
      inherited,
      alertMessage,
      tableFields
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsDetailsPanel);
