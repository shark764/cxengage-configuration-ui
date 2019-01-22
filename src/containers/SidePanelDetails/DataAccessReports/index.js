/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import DataAccessReportsDetailsPanel from './layout';
import { userHasUpdatePermission, getCurrentEntity, itemApiPending } from '../../../redux/modules/entities/selectors';

import { selectEntityListMembers, filterUsersByPermissions } from '../../../redux/modules/entities/users/selectors';
import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  const currentEntity = getCurrentEntity(state);
  const listMembers = selectEntityListMembers(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: filterUsersByPermissions(state, listMembers, ['ASSIGNED_REPORTS_READ']),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    itemApiPending: itemApiPending(state),
    defaultFilters: entitiesMetaData[currentEntity].defaultDependentEntityFilters
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(DataAccessReportsDetailsPanel);
