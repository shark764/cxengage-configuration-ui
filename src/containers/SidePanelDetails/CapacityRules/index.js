/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import CapacityRulesDetailsPanel from './layout';

import { userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { selectCapacityRuleVersions } from '../../../redux/modules/entities/capacityRules/selectors';

import { setSelectedSubEntityId } from '../../../redux/modules/entities';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  return {
    userHasUpdatePermission: userHasUpdatePermission(state),
    userHasViewPermission: userHasUpdatePermission(state),
    versions: selectCapacityRuleVersions(state),
    tableFields: entitiesMetaData['capacityRules'].membersTableFields,
  };
}

export const actions = {
  setSelectedSubEntityId,
};

export default injectIntl(connect(mapStateToProps, actions)(CapacityRulesDetailsPanel));
