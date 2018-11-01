import { connect } from 'react-redux';
import AddMemberToListLayout from '../layout';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../redux/modules/entities';
import {
  getSelectedEntityName,
  userHasUpdatePermission,
  getCurrentEntity,
  getSelectedSubEntityId
} from '../../../redux/modules/entities/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';
import { selectSidePanelTableItems } from '../selectors';

export function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    listName: getSelectedEntityName(state),
    entityName: currentEntity,
    fields: entitiesMetaData[currentEntity].modalListTableFields,
    tableItems: selectSidePanelTableItems(state, currentEntity),
    contains: getSelectedSubEntityId(state)
  };
}

export const actions = {
  addListItem: toggleListItemEntity,
  onCancel: () => setSelectedSubEntityId(undefined)
};

export default connect(mapStateToProps, actions)(AddMemberToListLayout);
