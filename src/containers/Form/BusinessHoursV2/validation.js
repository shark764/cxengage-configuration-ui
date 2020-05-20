/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

import store from '../../../redux/store';
import { getAllEntitiesTableData } from '../../../containers/EntityTable/selectors';
import { getCurrentEntity } from '../../../redux/modules/entities/selectors';
import { getCurrentTenantId } from '../../../redux/modules/userData/selectors';

export const formValidation = values => ({
  name:
    (isEmpty(values.get('name')) && 'Please enter a name') ||
    (getCurrentEntity(store.getState()) === 'businessHoursV2' &&
      getAllEntitiesTableData(store.getState())
        .filter(({ tenantId }) => tenantId === getCurrentTenantId(store.getState()))
        .some(({ name, id }) => name.toLowerCase() === values.get('name').toLowerCase() && id !== values.get('id')) &&
      "There's already a business hour with this name")
});
