/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import BetaFeaturesLayout from './layout';
import { userHasReadPermissionManual, userHasPermissions } from '../../redux/modules/entities/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { getCustomTheme } from '../../redux/modules/entities/branding/selectors';

const entitiesWithViewPermissions = state => {
  let allowedEntities = {};
  Object.keys(entitiesMetaData).forEach(entity => {
    if (userHasReadPermissionManual(state, entitiesMetaData[entity].entityName)) {
      allowedEntities[entity] = true;
    }
  });
  return allowedEntities;
};

export function mapStateToProps(state) {
  return {
    theme: getCustomTheme(state),
    entities: entitiesWithViewPermissions(state),
    disabledFeatures: {
      users: false,
      groups: false,
      skills: false,
      outboundIdentifiers: false,
      outboundIdentifierLists: false,
      roles: false,
      flows: false,
      dispatchMappings: false,
      logiStandard: !userHasPermissions(state, ['CONFIG_REPORTING_BI_VIEW']),
      logiAdvanced: !userHasPermissions(state, ['CONFIG_REPORTING_BI_VIEW'])
    }
  };
}

export default connect(mapStateToProps)(BetaFeaturesLayout);
