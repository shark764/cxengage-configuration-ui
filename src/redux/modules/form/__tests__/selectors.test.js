/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS, Map } from 'immutable';
import { isPristine, isInvalid } from 'redux-form/immutable';

import {
  getCurrentForm,
  getCurrentFormInitialValues,
  isFormInvalid,
  isFormPristine,
  selectFormInitialValues,
  formSubmission,
  subEntityFormSubmission,
  createFormName,
  getCurrentFormValueByFieldName,
  getCurrentSubForm,
  getCurrentSubFormValueByFieldName
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
  it('returns the selected entity when not undefined or create', () => {
    const selectedEntity = new Map({
      id: 'mockId',
      name: 'mockName'
    });
    expect(selectedEntity).toMatchSnapshot();
  });
  it('returns the selected entity when not undefined or create and has "active" key', () => {
    const selectedEntity = new Map({
      id: 'mockId',
      name: 'mockName',
      active: true
    });
    expect(selectedEntity).toMatchSnapshot();
  });
  it('returns new map {active: true} when getSelectedEntityId equals bulk', () => {
    getSelectedEntityId.mockImplementationOnce(() => 'bulk');
    expect(selectFormInitialValues({})).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = { id: 'mockId', name: 'mockName' };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});

describe('subEntityFormSubmission', () => {
  const values = { id: 'mockSubEntityId', name: 'mockSubEntityName' };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(subEntityFormSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});

describe('getCurrentFormValueByFieldName', () => {
  it('Returns proper value by field name given', () => {
    const initalState = fromJS({
      form: {
        'mock current entity:mock current entity id': {
          initial: {
            mockProperty: 'mock value'
          },
          values: { field: 'mockValue' }
        }
      }
    });
    expect(getCurrentFormValueByFieldName(initalState, 'field')).toMatchSnapshot();
  });
});

describe('getCurrentSubForm', () => {
  it('Returns proper form map by given formId', () => {
    const initalState = fromJS({
      form: {
        mockForm: {
          initial: {
            mockProperty: 'mock value'
          },
          values: { field: 'mockValue' }
        }
      }
    });
    expect(getCurrentSubForm(initalState, 'mockForm')).toMatchSnapshot();
  });
});

describe('getCurrentSubFormValueByFieldName', () => {
  it('Returns proper value by field name and formId given', () => {
    const initalState = fromJS({
      form: {
        mockForm: {
          initial: {
            mockProperty: 'mock value'
          },
          values: { field: 'mockValue' }
        }
      }
    });
    expect(getCurrentSubFormValueByFieldName(initalState, 'mockForm', 'field')).toMatchSnapshot();
  });
});
