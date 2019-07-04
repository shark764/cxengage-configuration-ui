/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { RolesDetailsPanel } from './layout.js';
//  import { isUserPlatformAdmin } from '../../../redux/modules/entities/users/selectors';
import { isSystemRole } from '../../../redux/modules/entities/selectors';

import {
  userHasUpdatePermission,
  isInherited,
  isEntityFetching,
  itemApiPending,
  getEntityParentTenantName
} from '../../../redux/modules/entities/selectors';

import { getEntityListMembers, getListSize } from '../../../redux/modules/entities/listItemSelectors';

import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';

import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

/*  TODO - CXV1-17410 */
export function mapStateToProps(state, props) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    tableFields: entitiesMetaData.roles.sidePanelListTableFields,
    rolesFetching: isEntityFetching(state, 'roles'),
    itemApiPending: itemApiPending(state),
    listSize: getListSize(state),
    inherited: isInherited(state),
    parentTenantName: getEntityParentTenantName(state),
    //  isUserPlatformAdmin: isUserPlatformAdmin(state),
    isSystemRole: isSystemRole(state)
  };
}

export const actions = { removeListItem, setSelectedSubEntityId };

export default connect(
  mapStateToProps,
  actions
)(RolesDetailsPanel);
