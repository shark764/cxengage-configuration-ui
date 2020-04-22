/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import SlasDetailsPanel from './layout';
import {
  isInherited,
  userHasUpdatePermission,
  isEntityFetching,
  itemApiPending,
  userHasPermissions
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId } from '../../../redux/modules/entities';
import { selectSlaItems, getSlaItemFields } from '../../../redux/modules/entities/slas/selectors';

export function mapStateToProps(state) {
  return {
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
    slasFetching: isEntityFetching(state, 'slas'),
    versionsItems: selectSlaItems(state, 'versions'),
    versionsFields: getSlaItemFields(state, 'versions'),
    itemApiPending: itemApiPending(state)
  };
}

export const actions = { setSelectedSubEntityId };

export default connect(mapStateToProps, actions)(SlasDetailsPanel);
