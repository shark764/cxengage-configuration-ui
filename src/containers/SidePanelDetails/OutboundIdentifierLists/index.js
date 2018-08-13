/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { OutboundIdentifierListsDetailsPanel } from './Layout.js';
import {
  userHasUpdatePermission,
  getSelectedEntity
} from '../../../redux/modules/entities/selectors';

export function mapStateToProps(state) {
  return {
    item: getSelectedEntity(state),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(OutboundIdentifierListsDetailsPanel);
