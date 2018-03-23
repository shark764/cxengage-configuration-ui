/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { ListsDetailsPanel } from 'cx-ui-components';

import {
  setSelectedSubEntityId,
  deleteSubEntity,
  userHasUpdatePermission,
  getSelectedEntity
} from '../../../redux/modules/crudEndpoint';

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

  const tableFields = selectedEntity.getIn(['listType', 'fields']).toJS();
  tableFields.push({ label: 'Actions', name: 'subEntityActions' });
  if (selectedEntity) {
    return {
      listType: selectedEntity.get('listType').get('name'),
      // TODO alertMessage: `TODO: session tenantId vs createdby tenantId`,
      tableItems: selectedEntity.get('items').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      tableFields
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsDetailsPanel);
