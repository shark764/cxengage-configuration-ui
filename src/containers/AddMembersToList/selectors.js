/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { availableEntitiesForList } from '../../redux/modules/entities/selectors';
import { availablePermissionsForList } from '../../redux/modules/entities/roles/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

export const selectSidePanelTableItems = (state, currentEntity) => {
  const { dependentEntity } = entitiesMetaData[currentEntity];

  switch (currentEntity) {
    case 'outboundIdentifierLists':
    case 'skills': {
      return availableEntitiesForList(state, dependentEntity, currentEntity);
    }
    case 'roles': {
      return availablePermissionsForList(state, dependentEntity, currentEntity);
    }
    default:
      break;
  }
};
