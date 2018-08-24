/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { OutboundIdentifierListsDetailsPanel } from './Layout.js';

import {
  userHasUpdatePermission,
  getSelectedEntity,
  getEntityListMembers,
  getListSize
} from '../../../redux/modules/entities/selectors';

import {
  toggleEntityListItemActive,
  setSelectedSubEntityId,
  removeListItem
} from '../../../redux/modules/entities';

export function mapStateToProps(state, props) {
  return {
    item: getSelectedEntity(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getEntityListMembers(state),
    listSize: getListSize(state)
  };
}

export const actions = {
  toggleEntityListItemActive,
  removeListItem,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(
  OutboundIdentifierListsDetailsPanel
);
