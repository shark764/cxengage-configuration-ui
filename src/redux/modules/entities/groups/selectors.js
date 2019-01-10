/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getDependantEntityTableItems } from '../listItemSelectors';
import { getDisplay } from '../users/selectors';

export const getGroupsDependantEntityTableItems = state => {
  return getDependantEntityTableItems(state).map(user => ({
    ...user,
    name: getDisplay(user)
  }));
};
