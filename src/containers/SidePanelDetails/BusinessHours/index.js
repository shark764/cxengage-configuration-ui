/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import BusinessHoursDetailsPanel from './layout';

import { userHasUpdatePermission, isEntityFetching, itemApiPending } from '../../../redux/modules/entities/selectors';

import { setSelectedSubEntityId, removeListItem } from '../../../redux/modules/entities';
import { selectBusinessHourExceptions } from '../../../redux/modules/entities/businessHours/selectors';

export function mapStateToProps(state) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    businessHoursFetching: isEntityFetching(state, 'businessHours'),
    exceptionsItems: selectBusinessHourExceptions(state),
    itemApiPending: itemApiPending(state)
  };
}

export const actions = {
  setSelectedSubEntityId,
  removeListItem
};

export default connect(mapStateToProps, actions)(BusinessHoursDetailsPanel);
