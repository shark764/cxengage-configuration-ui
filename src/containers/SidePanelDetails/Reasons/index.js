/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import reasonsDetailsPanel from './layout';
import { userHasUpdatePermission, getSelectedEntity, isInherited } from '../../../redux/modules/entities/selectors';

export function mapStateToProps(state) {
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    inherited: isInherited(state)
  };
}

export default connect(mapStateToProps)(reasonsDetailsPanel);
