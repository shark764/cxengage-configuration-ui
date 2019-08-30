/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  const daysInitials = ['sun', 'sat', 'mon', 'tue', 'thu', 'wed', 'fri'];
  let validation = {};

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  return daysInitials.reduce(
    (r, i) => ({
      ...r,
      [i.concat('StartTimeMinutes')]:
        values.get(i.concat('StartTimeMinutes')) > values.get(i.concat('EndTimeMinutes')) &&
        values.get(i.concat('EndTimeMinutes')) !== 0 &&
        'Start time may not be after end time'
    }),
    validation
  );
};
