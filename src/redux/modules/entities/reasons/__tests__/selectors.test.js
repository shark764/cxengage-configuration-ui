/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentSharedValue } from '../selectors';

const mockCurrentForm = fromJS({
  values: {
    shared: false
  },
  initial: {
    shared: false
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

describe('getCurrentSharedValue', () => {
  it("returns the current form's getCurrentSharedValue value", () => {
    expect(getCurrentSharedValue()).toMatchSnapshot();
  });
});
