/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import UsersDetailsPanel from './layout';

import { userHasUpdatePermission, isInherited } from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../redux/modules/entities/listItemSelectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    inherited: isInherited(state),
    skillsItems: getSidePanelTableItems(state, 'skills'),
    skillsFields: entitiesMetaData.skills.memberListTableFields,
    groupsItems: getSidePanelTableItems(state, 'groups'),
    groupsFields: entitiesMetaData.groups.memberListTableFields,
    outboundIdentifierListsItems: getSidePanelTableItems(state, 'outboundIdentifierLists'),
    outboundIdentifierListsFields: entitiesMetaData.outboundIdentifierLists.memberListTableFields,
    reasonListsItems: getSidePanelTableItems(state, 'reasonLists'),
    reasonListsFields: entitiesMetaData.reasonLists.memberListTableFields,
    transferListsItems: getSidePanelTableItems(state, 'transferLists'),
    transferListsFields: entitiesMetaData.transferLists.memberListTableFields,
    messageTemplatesItems: getSidePanelTableItems(state, 'messageTemplates'),
    messageTemplatesFields: entitiesMetaData.messageTemplates.memberListTableFields
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(UsersDetailsPanel);
