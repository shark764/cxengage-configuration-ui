import { connect } from 'react-redux';
import AddMemberToListLayout from '../layout';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../redux/modules/entities';
import {
  userHasUpdatePermission,
  getCurrentEntity,
  getSelectedSubEntityId,
  itemApiPending
} from '../../../redux/modules/entities/selectors';
import { selectModalTableItems } from './selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    listName: getSelectedSubEntityId(state),
    entityName: currentEntity,
    fields: entitiesMetaData[getSelectedSubEntityId(state)].memberListTableFields,
    tableItems: selectModalTableItems(state, getSelectedSubEntityId(state)),
    itemApiPending: itemApiPending(state),
    defaultFilters: entitiesMetaData[currentEntity].defaultAssociationFilters[getSelectedSubEntityId(state)],
    contains: getSelectedSubEntityId(state)
  };
}

export const actions = {
  addListItem: toggleListItemEntity,
  onCancel: () => setSelectedSubEntityId(undefined)
};

export default connect(mapStateToProps, actions)(AddMemberToListLayout);
