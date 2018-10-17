/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import GroupsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  getSelectedEntity,
  getCurrentEntity,
  getEntityListMembers,
  getListSize
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  const currentEntity = getCurrentEntity(state);
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    listSize: getListSize(state)
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(GroupsDetailsPanel);
