/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { getAllEntities as getAllEntitiesFromStore } from '../../redux/modules/entities/selectors';

export const getAllEntities = state =>
  getAllEntitiesFromStore(state)
    ? getAllEntitiesFromStore(state).toJS()
    : undefined;
