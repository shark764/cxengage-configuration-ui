import { connect } from 'react-redux';
import AddMemberToListLayout from './layout';
import {
  setSelectedSubEntityId,
  addListItem,
  toggleEntityListItemActive
} from '../../redux/modules/entities';
import {
  getSelectedEntityName,
  availableEntitiesForList,
  userHasUpdatePermission
} from '../../redux/modules/entities/selectors';

export function mapStateToProps(state) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    listName: getSelectedEntityName(state),
    tableItems: availableEntitiesForList(
      state,
      'outboundIdentifiers',
      'outboundIdentifierLists'
    )
  };
}

export const actions = {
  addListItem,
  toggleEntityListItemActive,
  onCancel: () => setSelectedSubEntityId(undefined)
};

export default connect(mapStateToProps, actions)(AddMemberToListLayout);
