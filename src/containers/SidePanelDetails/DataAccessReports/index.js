/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import DataAccessReportsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  getCurrentEntity,
  isInherited
} from '../../../redux/modules/entities/selectors';
import {
  getEntityListMembers,
  getListSize
} from '../../../redux/modules/entities/listItemSelectors';
import {
  setSelectedSubEntityId,
  removeListItem
} from '../../../redux/modules/entities';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  const currentEntity = getCurrentEntity(state);
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    listSize: getListSize(state),
    inherited: isInherited(state)
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(DataAccessReportsDetailsPanel);