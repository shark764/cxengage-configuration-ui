/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import SkillsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  getSelectedEntity,
  isEntityFetching,
  userHasPermissions
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity, updateProficiency } from '../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../redux/modules/entities/listItemSelectors';
import {
  getSkillMemberSidePanelTableItems,
  getHasProficiencyFormValue
} from '../../../redux/modules/entities/skills/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';
import store from '../../../redux/store';

export function mapStateToProps(state) {
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    usersItems: getSkillMemberSidePanelTableItems(state),
    usersFields: getHasProficiencyFormValue(state)
      ? [
          ...entitiesMetaData.users.memberListTableFields,
          {
            label: 'Proficiency',
            name: 'proficiency',
            isColumnEditable: userHasUpdatePermission(state) && userHasPermissions(state, ['MANAGE_ALL_USER_SKILLS']),
            filterable: false,
            actions: {
              onChange: (id, newValue) => store.dispatch(updateProficiency(id, newValue))
            }
          }
        ]
      : entitiesMetaData.users.memberListTableFields,
    usersFetching: isEntityFetching(state, 'users'),
    outboundIdentifierListsItems: getSidePanelTableItems(state, 'outboundIdentifierLists'),
    outboundIdentifierListsFields: entitiesMetaData.outboundIdentifierLists.memberListTableFields,
    outboundIdentifierListsFetching: isEntityFetching(state, 'outboundIdentifierLists'),
    defaultFilters: entitiesMetaData.skills.defaultAssociationFilters
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(SkillsDetailsPanel);
