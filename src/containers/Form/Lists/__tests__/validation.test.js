import { updateFormValidation, createFormValidation } from '../validation';
import { Map } from 'immutable';

describe('updateFormValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName'
    });
    expect(updateFormValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: ''
    });
    expect(updateFormValidation(values)).toMatchSnapshot();
  });
});

describe('createFormValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      listTypeId: 'mockListTypeId'
    });
    expect(createFormValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      listTypeId: ''
    });
    expect(createFormValidation(values)).toMatchSnapshot();
  });
});
