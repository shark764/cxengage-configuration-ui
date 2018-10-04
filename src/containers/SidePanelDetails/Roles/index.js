/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { RolesDetailsPanel } from './layout.js';

import { userHasUpdatePermission, getSelectedEntity } from '../../../redux/modules/entities/selectors';

import { getEntityListMembers, getListSize } from '../../../redux/modules/entities/roles/selectors';

import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';

export function mapStateToProps(state, props) {
  return {
    item: getSelectedEntity(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    listSize: getListSize(state)
  };
}

export const actions = {
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(RolesDetailsPanel);
