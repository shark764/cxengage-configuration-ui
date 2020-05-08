/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props = {}) => {
  let validation = {};
  let { isSaving, isFetching, initialized } = props;
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.dispositions =
    !isSaving &&
    !isFetching &&
    initialized &&
    (!values.get('dispositions') || values.get('dispositions').size === 0) &&
    'You must have one or more items in your Disposition List in order to save.';

  if (values.get('shared') === true && values.get('dispositions') && values.get('dispositions').size !== 0) {
    let unsharedDispositions = values.get('dispositions').filter(d => d.get('shared') !== true);
    if (unsharedDispositions.size !== 0) {
      validation.dispositions = "Shared disposition lists cannot contain dispositions that aren't also shared.";
    }
  }
  return validation;
};
