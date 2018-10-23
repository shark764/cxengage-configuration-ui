/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import OutboundIdentifiersDetailsPanel from './layout';
import { userHasUpdatePermission, getSelectedEntity } from '../../../redux/modules/entities/selectors';

export function mapStateToProps(state) {
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(OutboundIdentifiersDetailsPanel);
