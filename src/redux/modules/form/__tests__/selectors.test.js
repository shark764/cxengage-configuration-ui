/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getCurrentForm, getCurrentFormInitialValues } from '../selectors';

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

describe('getCurrentFormInitialValues', () => {
  it("returns the current form's inital values converted to javascript", () => {
    const initalState = fromJS({
      form: {
        'mock current entity:mock current entity id': {
          initial: {
            mockProperty: 'mock value'
          }
        }
      }
    });
    expect(getCurrentFormInitialValues(initalState)).toMatchSnapshot();
  });
});
