/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */


import { fromJS } from 'immutable';
import {
  getAbandonTypeFormValue
} from '../selectors';

 const mockCurrentForm = fromJS({
   values: {
     slaAbandonType: 'mock slaAbandonType value'
   }
 });
 jest.mock('../../../form/selectors', () => ({
   getCurrentForm: () => mockCurrentForm
 }));

describe('getAbandonTypeFormValue', () => {
  it("returns the current form's slaAbandonType value", () => {
    expect(getAbandonTypeFormValue()).toEqual('mock slaAbandonType value');
  });
});
