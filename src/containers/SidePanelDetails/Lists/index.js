/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { ListsDetailsPanel } from 'cx-ui-components';

import {
  setSelectedSubEntityId,
  deleteSubEntity,
  userHasUpdatePermission,
  getSelectedEntity,
  isListInherited
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
  if (selectedEntity) {
    return {
      listType: selectedEntity.get('listType').get('name'),
      // TODO alertMessage: `TODO: session tenantId vs createdby tenantId`,
      tableItems: selectedEntity.get('items').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      listIsInherited: isListInherited(state),
      tableFields: selectedEntity.getIn(['listType', 'fields']).toJS()
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsDetailsPanel);
