/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { availableEntitiesForList } from '../../redux/modules/entities/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { availableItemsForList, availableEntityMembersForList } from '../../redux/modules/entities/listItemSelectors';
import { selectAvailableEntityMembersForList } from '../../redux/modules/entities/users/selectors';

export const selectSidePanelTableItems = (state, currentEntity) => {
  const { dependentEntity } = entitiesMetaData[currentEntity];

  switch (currentEntity) {
    case 'outboundIdentifierLists': {
      return availableEntitiesForList(state, dependentEntity, currentEntity);
    }
    case 'skills':
    case 'groups': {
      return availableItemsForList(state, dependentEntity, currentEntity);
    }
    case 'roles': {
      return availableEntityMembersForList(state, dependentEntity, currentEntity);
    }
    case 'dataAccessReports': {
      return selectAvailableEntityMembersForList(state, ['ASSIGNED_REPORTS_READ']);
    }
    default:
      break;
  }
};
