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
      users: !(
        (userHasPermissions(state, ['VIEW_ALL_USERS', 'PLATFORM_VIEW_ALL_USERS']) &&
          userHasPermissions(state, ['MANAGE_ALL_GROUPS', 'MANAGE_ALL_SKILLS'])) ||
        userHasPermissions(state, ['CONFIG_USERS_VIEW', 'PLATFORM_CONFIG_USERS_VIEW']) ||
        userHasPermissions(state, [
          'PLATFORM_MANAGE_ALL_TENANTS_ENROLLMENT',
          'MANAGE_ALL_USER_EXTENSIONS',
          'MANAGE_ALL_GROUP_USERS',
          'MANAGE_ALL_USER_SKILLS',
          'MANAGE_ALL_USER_LOCATIONS',
          'MANAGE_TENANT_ENROLLMENT'
        ])
      ),
      groups: false,
      skills: false,
      outboundIdentifiers: false,
      outboundIdentifierLists: false,
      roles: false,
      flows: false,
      dispatchMappings: false
    }
  };
}

export default connect(mapStateToProps)(BetaFeaturesLayout);
