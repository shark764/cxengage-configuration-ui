/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getCurrentEntity, getSelectedEntityId } from '../crudEndpoint/selectors';

export const getCurrentForm = state =>
  state.getIn([
    'form',
    `${getCurrentEntity(state)}:${getSelectedEntityId(state)}`
  ]);
