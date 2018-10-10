import { connect } from 'react-redux';
import AddMemberToListLayout from './layout';
import {
  setSelectedSubEntityId,
  addListItem,
  toggleEntityListItemActive,
  updateEntity
} from '../../redux/modules/entities';
import {
  getSelectedEntityName,
  availableEntitiesForList,
  userHasUpdatePermission,
  getCurrentEntity
} from '../../redux/modules/entities/selectors';
import { availablePermissionsForList } from '../../redux/modules/entities/roles/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

export function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);

  switch (currentEntity) {
    case 'outboundIdentifierLists': {
      return {
        userHasUpdatePermission: userHasUpdatePermission(state),
        listName: getSelectedEntityName(state),
        entityName: currentEntity,
        fields: entitiesMetaData[currentEntity].modalListTableFields,
        tableItems: availableEntitiesForList(state, 'outboundIdentifiers', currentEntity)
      };
    }
    case 'roles': {
      return {
        userHasUpdatePermission: userHasUpdatePermission(state),
        listName: getSelectedEntityName(state),
        entityName: currentEntity,
        fields: entitiesMetaData[currentEntity].modalListTableFields,
        tableItems: availablePermissionsForList(state, 'permissions', currentEntity)
      };
    }
    default:
      break;
  }
}

export const actions = {
  addListItem,
  updateEntity,
  toggleEntityListItemActive,
  onCancel: () => setSelectedSubEntityId(undefined)
};

export default connect(mapStateToProps, actions)(AddMemberToListLayout);
