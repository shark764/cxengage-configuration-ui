/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getChannelTypeFormValue } from '../selectors';

const mockCurrentForm = fromJS({
  values: {
    channelType: 'voice'
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

describe('getChannelTypeFormValue', () => {
  it("returns the current form's channelType value", () => {
    expect(getChannelTypeFormValue()).toEqual('voice');
  });
});
