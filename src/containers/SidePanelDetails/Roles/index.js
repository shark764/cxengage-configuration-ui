/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { RolesDetailsPanel } from './layout.js';

import {
  userHasUpdatePermission,
  getSelectedEntity,
  getCurrentEntity,
  isInherited,
  isEntityFetching
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
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    rolesFetching: isEntityFetching(state, 'roles'),
    listSize: getListSize(state),
    inherited: isInherited(state)
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(RolesDetailsPanel);
