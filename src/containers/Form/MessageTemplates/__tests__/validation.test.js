/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { formValidation } from '../validation';
import { fromJS } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = fromJS({
      name: 'mockName',
      channels: ['mockChannels'],
      templateTextType: 'plaintext',
      template: 'mock template text'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided in the required fields', () => {
    const values = fromJS({
      name: '',
      channels: [],
      templateTextType: 'abc',
      template: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
