/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getEmailTemplateFormValue } from '../selectors';

const mockCurrentForm = fromJS({
  values: {
    email: 'mock email value'
  }
});
jest.mock('../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm,
}));

describe('getEmailTemplateFormValue', () => {
  it('returns the current form\'s email value', () => {
    expect(getEmailTemplateFormValue()).toEqual('mock email value');
  });
});
