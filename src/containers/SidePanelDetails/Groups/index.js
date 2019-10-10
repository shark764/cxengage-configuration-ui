/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import GroupsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  userHasPermissions,
  getSelectedEntity,
  isInherited,
  isEntityFetching,
  itemApiPending
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../redux/modules/entities/listItemSelectors';
import { getGroupsDependantEntityTableItems, isEveryone } from '../../../redux/modules/entities/groups/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    inherited: isInherited(state),
    usersItems: getGroupsDependantEntityTableItems(state),
    usersFields: entitiesMetaData.users.memberListTableFields,
    usersFetching: isEntityFetching(state, 'users'),
    outboundIdentifierListsItems: getSidePanelTableItems(state, 'outboundIdentifierLists'),
    outboundIdentifierListsFields: entitiesMetaData.outboundIdentifierLists.memberListTableFields,
    outboundIdentifierListsFetching: isEntityFetching(state, 'outboundIdentifierLists'),
    reasonListsItems: getSidePanelTableItems(state, 'reasonLists'),
    reasonListsFields: entitiesMetaData.reasonLists.memberListTableFields,
    reasonListsFetching: isEntityFetching(state, 'reasonLists'),
    defaultFilters: entitiesMetaData.groups.defaultAssociationFilters,
    itemApiPending: itemApiPending(state),
    sidePanelReadPermissions: {
      users: userHasPermissions(state, ['VIEW_ALL_GROUPS']),
      outboundIdentifierLists: userHasPermissions(state, ['OUTBOUND_IDENTIFIER_READ']),
      reasonLists: userHasPermissions(state, ['READ_PRESENCE_REASONS'])
    },
    sidePanelUpdatePermissions: {
      outboundIdentifierLists: userHasPermissions(state, ['OUTBOUND_IDENTIFIER_ASSIGN']),
      reasonLists: userHasPermissions(state, ['MANAGE_ALL_GROUP_REASON_LISTS'])
    },
    isEveryone: isEveryone(state)
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(GroupsDetailsPanel);
