/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import DataAccessReportsDetailsPanel from './layout';
import { userHasUpdatePermission, getCurrentEntity } from '../../../redux/modules/entities/selectors';

import { selectEntityListMembers } from '../../../redux/modules/entities/users/selectors';
import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  const currentEntity = getCurrentEntity(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: selectEntityListMembers(state),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    defaultFilters: entitiesMetaData[currentEntity].defaultFilters
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(DataAccessReportsDetailsPanel);
