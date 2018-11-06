/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import OutboundIdentifierListsDetailsPanel from './layout';

import {
  userHasUpdatePermission,
  getSelectedEntity,
  getCurrentEntity,
  getEntityListMembers,
  getListSize
} from '../../../redux/modules/entities/selectors';

import { toggleEntityListItemActive, setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';
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
  toggleEntityListItemActive,
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(OutboundIdentifierListsDetailsPanel);
