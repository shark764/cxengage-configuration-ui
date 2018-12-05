/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import SkillsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  getSelectedEntity
} from '../../../redux/modules/entities/selectors';
import {
  setSelectedSubEntityId,
  toggleListItemEntity
} from '../../../redux/modules/entities';
import {
  getDependantEntityTableItems,
  getSidePanelTableItems
} from '../../../redux/modules/entities/listItemSelectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    usersItems: getDependantEntityTableItems(state),
    usersFields: entitiesMetaData.users.memberListTableFields,
    outboundIdentifierListsItems: getSidePanelTableItems(
      state,
      'outboundIdentifierLists'
    ),
    outboundIdentifierListsFields:
      entitiesMetaData.outboundIdentifierLists.memberListTableFields,
    defaultFilters: entitiesMetaData.skills.defaultAssociationFilters
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(SkillsDetailsPanel);
