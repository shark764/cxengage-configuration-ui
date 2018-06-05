/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { isPristine, isInvalid } from 'redux-form/immutable';

import {
  getCurrentForm,
  getCurrentFormInitialValues,
  isFormInvalid,
  isFormPristine,
  selectFormInitialValues
} from '../selectors';

import {
  getSelectedEntity,
  getCurrentEntity,
  getSelectedEntityId,
  getSelectedEntityFormId
} from '../../entities/selectors';

jest.mock('redux-form/immutable');
jest.mock('../../entities/selectors');
getCurrentEntity.mockImplementation(() => 'mock current entity');
getSelectedEntityId.mockImplementation(() => 'mock current entity id');
getSelectedEntityFormId.mockImplementation(() => 'mock current entity form id');

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

describe('isFormInvalid', () => {
  beforeEach(() => {
    isInvalid.mockImplementation(() => {
      return () => {};
    });
  });

  it("correctly calls redux-form's 'isInvalid' method", () => {
    isFormInvalid('mock inital state');
    expect(isInvalid).toMatchSnapshot();
  });
});

describe('isFormPristine', () => {
  beforeEach(() => {
    isPristine.mockImplementation(() => {
      return () => {};
    });
  });

  it("correctly calls redux-form's 'isPristine' method", () => {
    isFormPristine('mock inital state');
    expect(isPristine).toMatchSnapshot();
  });
});

describe('selectFormInitialValues', () => {
  it('returns immutable map {active: true} when getSelectedEntity is undefined', () => {
    getSelectedEntity.mockImplementationOnce(() => undefined);
    expect(selectFormInitialValues({})).toMatchSnapshot();
  });
  it('returns the selected entity when not undefiend or create', () => {
    getSelectedEntity.mockImplementation(() => 'mockEntity');
    expect(selectFormInitialValues({})).toMatchSnapshot();
  });
});
