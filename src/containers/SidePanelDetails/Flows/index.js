/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import FlowsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  isEntityFetching,
  itemApiPending,
  userHasPermissions
} from '../../../redux/modules/entities/selectors';
import { createDraftItem, openFlowDesigner, copyListItem, removeListItem } from '../../../redux/modules/entities';
import { selectFlowItems, getFlowItemFields } from '../../../redux/modules/entities/flows/selectors';

export function mapStateToProps(state) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
    flowsFetching: isEntityFetching(state, 'flows'),
    versionsItems: selectFlowItems(state, 'versions'),
    versionsFields: getFlowItemFields(state, 'versions'),
    draftsItems: selectFlowItems(state, 'drafts'),
    draftsFields: getFlowItemFields(state, 'drafts'),
    itemApiPending: itemApiPending(state)
  };
}

export const actions = {
  createDraftItem,
  removeListItem,
  openFlowDesigner,
  copyListItem
};

export default connect(mapStateToProps, actions)(FlowsDetailsPanel);
