/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

import store from '../../../redux/store';
import { getEntityData } from '../../../redux/modules/entities/selectors';

export const formValidation = (values, { intl: { formatMessage } }) => ({
  name:
    (isEmpty(values.get('name')) &&
      formatMessage({
        id: 'identityProviders.details.name.error',
        defaultMessage: 'Please enter a name...',
      })) ||
    (getEntityData(store.getState(), 'capacityRules').some(
      (capacityRule) => capacityRule.get('id') !== values.get('id') && capacityRule.get('name') === values.get('name')
    ) &&
      formatMessage({
        id: 'capacityRules.details.name.duplicateError',
        defaultMessage: "Two Capacity Rules can't have the same name",
      })),
});
