/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = values => {
  const templateFieldValue = values.get('template');
  let valueExists;

  if (templateFieldValue) {
    // Do not submit when there is no text in the template field(that includes line breaks, spaces):
    const ele = document.createElement('div');
    ele.innerHTML = templateFieldValue;
    valueExists = ele.innerText && ele.innerText.trim().length > 0;
  }
  return {
    name: isEmpty(values.get('name')) && 'Please enter a name',
    channels: (!values.get('channels') || values.get('channels').size <= 0) && 'Please select a channel type',
    templateTextType: !values.get('templateTextType') && 'Please select a valid template text type',
    template: (isEmpty(values.get('template')) || !valueExists) && 'Please enter template text'
  };
};
