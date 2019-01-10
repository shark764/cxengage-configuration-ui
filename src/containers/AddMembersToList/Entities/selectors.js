/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getModalTableItems } from '../../../redux/modules/entities/listItemSelectors';
import { getModalTableUserItems } from '../../../redux/modules/entities/users/selectors';

export const selectModalTableItems = (state, entityName) => {
  switch (entityName) {
    case 'users': {
      return getModalTableUserItems(state, entityName);
    }
    default: {
      return getModalTableItems(state, entityName);
    }
  }
};
