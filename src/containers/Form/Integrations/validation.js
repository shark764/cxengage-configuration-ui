/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  let validation = {};

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  validation.type = !values.get('type') && 'Please select a type';

  const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (values.get('type') === 'monet') {
    validation.properties = {
      monetUrl: !pattern.test(values.getIn(['properties', 'monetUrl'])) && 'Please enter a valid URL',
      username: isEmpty(values.getIn(['properties', 'username'])) && 'Please enter a username',
      password: isEmpty(values.getIn(['properties', 'password'])) && 'Please enter a password'
    };
  }

  return validation;
};
