/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

const validateUrl = (string) => {
  try {
    const url = new URL(string);
  } catch (_) {
    return 'Audio source must be a URL';
  }
  return false;
};

export const formValidation = (values) => {
  let validation = {};
  const type = values.get('type');
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.type = !values.get('type') && 'Please select a type';

  if (type) {
    if (type === 'tts') {
      validation.source = isEmpty(values.get('source')) && 'Please enter text';

      const properties = values.get('properties');
      if (properties) {
        validation.properties = {
          language: !properties.get('language') && 'Please select a language',
          voice: !properties.get('voice') && 'Please select a voice',
        };
      } else {
        validation.properties = {
          language: 'Please select a language',
          voice: 'Please select a voice',
        };
      }
    }

    if (type === 'audio') {
      validation.source =
        isEmpty(values.get('sourceFile')) && isEmpty(values.get('source')) && 'Please enter a audio file or URL';
      if (!values.get('sourceFile') && !isEmpty(values.get('source'))) {
        validation.source = validateUrl(values.get('source'));
      }
    }

    if (type === 'list') {
      validation.source = values.get('source').size === 0 && 'Prevent save of form';
    }
  }

  return validation;
};
