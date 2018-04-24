/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentForm } from '../selectors';

jest.mock('../../entities/selectors', () => ({
  getCurrentEntity: () => 'mock current entity',
  getSelectedEntityId: () => 'mock current entity id'
}));

describe('getCurrentForm', () => {
  it('returns the current form', () => {
    const initalState = fromJS({
      form: {
        'mock current entity:mock current entity id': 'mock current form value'
      }
    });
    expect(getCurrentForm(initalState)).toEqual('mock current form value');
  });
});
