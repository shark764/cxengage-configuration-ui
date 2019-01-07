/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getHasProficiencyFormValue } from '../selectors';

const mockCurrentForm = fromJS({
  values: {
    hasProficiency: 'mock hasProficiency value'
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

describe('getHasProficiencyFormValue', () => {
  it("returns the current form's hasProficiency value", () => {
    expect(getHasProficiencyFormValue()).toEqual('mock hasProficiency value');
  });
});
