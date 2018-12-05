import { connect } from 'react-redux';
import AddMemberToListLayout from './layout';
import {
  getSelectedEntityName,
  userHasUpdatePermission,
  getCurrentEntity
} from '../../redux/modules/entities/selectors';
import {
  setSelectedSubEntityId,
  addListItem,
  toggleEntityListItemActive,
  updateEntity
} from '../../redux/modules/entities';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { selectSidePanelTableItems } from './selectors';

export function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    listName: getSelectedEntityName(state),
    entityName: currentEntity,
    fields: entitiesMetaData[currentEntity].modalListTableFields,
    tableItems: selectSidePanelTableItems(state, currentEntity),
    defaultFilters:
      entitiesMetaData[currentEntity].defaultDependentEntityFilters
  };
}

export const actions = {
  addListItem,
  updateEntity,
  toggleEntityListItemActive,
  onCancel: () => setSelectedSubEntityId(undefined)
};

export default connect(mapStateToProps, actions)(AddMemberToListLayout);
