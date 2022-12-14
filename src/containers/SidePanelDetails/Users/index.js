/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import UsersDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  isEntityFetching,
  userHasPermissions,
  itemApiPending,
  getSelectedEntity
} from '../../../redux/modules/entities/selectors';
import {
  setSelectedSubEntityId,
  toggleListItemEntity,
  updateProficiency,
  setTenantUserAsImpersonated
} from '../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../redux/modules/entities/listItemSelectors';
import {
  getSkillsWithProficiencyTableItems,
  getDisplay,
  userHasLogiImpersonatePermissions
} from '../../../redux/modules/entities/users/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';
import store from '../../../redux/store';

export function mapStateToProps(state, props) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    skillsItems: getSkillsWithProficiencyTableItems(state),
    skillsFields: [
      ...entitiesMetaData.skills.memberListTableFields,
      {
        label: 'Proficiency',
        name: 'proficiency',
        isColumnEditable: userHasUpdatePermission(state) && userHasPermissions(state, ['MANAGE_ALL_USER_SKILLS']),
        filterable: false,
        actions: {
          onChange: (id, newValue) => store.dispatch(updateProficiency(id, newValue))
        }
      }
    ],
    skillsFetching: isEntityFetching(state, 'skills'),
    groupsItems: getSidePanelTableItems(state, 'groups'),
    groupsFields: entitiesMetaData.groups.memberListTableFields,
    groupsFetching: isEntityFetching(state, 'groups'),
    outboundIdentifierListsItems: getSidePanelTableItems(state, 'outboundIdentifierLists'),
    outboundIdentifierListsFields: entitiesMetaData.outboundIdentifierLists.memberListTableFields,
    outboundIdentifierListsFetching: isEntityFetching(state, 'outboundIdentifierLists'),
    reasonListsItems: getSidePanelTableItems(state, 'reasonLists'),
    reasonListsFields: entitiesMetaData.reasonLists.memberListTableFields,
    reasonListsFetching: isEntityFetching(state, 'reasonLists'),
    transferListsItems: getSidePanelTableItems(state, 'transferLists'),
    transferListsFields: entitiesMetaData.transferLists.memberListTableFields,
    transferListsFetching: isEntityFetching(state, 'transferLists'),
    messageTemplatesItems: getSidePanelTableItems(state, 'messageTemplates'),
    messageTemplatesFields: entitiesMetaData.messageTemplates.memberListTableFields,
    messageTemplatesFetching: isEntityFetching(state, 'messageTemplates'),
    defaultFilters: entitiesMetaData.users.defaultAssociationFilters,
    itemApiPending: itemApiPending(state),
    sidePanelUpdatePermissions: {
      skills: userHasPermissions(state, ['MANAGE_ALL_USER_SKILLS']),
      groups: userHasPermissions(state, ['MANAGE_ALL_GROUP_USERS']),
      reasonLists: userHasPermissions(state, ['MANAGE_ALL_USER_REASON_LISTS']),
      messageTemplates: userHasPermissions(state, ['MANAGE_ALL_MESSAGE_TEMPLATES']),
      transferLists: userHasPermissions(state, ['MANAGE_ALL_TRANSFER_LISTS']),
      outboundIdentifierLists: userHasPermissions(state, ['OUTBOUND_IDENTIFIER_ASSIGN'])
    },
    sidePanelReadPermissions: {
      skills: userHasPermissions(state, ['VIEW_ALL_SKILLS']),
      groups: userHasPermissions(state, ['VIEW_ALL_GROUPS']),
      reasonLists: userHasPermissions(state, ['READ_PRESENCE_REASONS']),
      messageTemplates: userHasPermissions(state, ['VIEW_ALL_MESSAGE_TEMPLATES']),
      transferLists: userHasPermissions(state, ['VIEW_ALL_TRANSFER_LISTS']),
      outboundIdentifierLists: userHasPermissions(state, ['OUTBOUND_IDENTIFIER_READ'])
    },
    userDisplay: getDisplay({
      firstName: getSelectedEntity(state).get('firstName'),
      lastName: getSelectedEntity(state).get('lastName'),
      email: getSelectedEntity(state).get('email')
    }),
    userHasLogiImpersonatePermissions: userHasLogiImpersonatePermissions(state)
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId,
  setTenantUserAsImpersonated
};

export default connect(mapStateToProps, actions)(UsersDetailsPanel);
