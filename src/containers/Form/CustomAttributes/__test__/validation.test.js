import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      identifier: 'mock-identifier',
      name: 'mockName'
    });
    const props = { isCreatingNewAtrribute: true, availableIdentifiers: ['mock-identifer-1', 'mock-identifer-2'] };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      identifier: '',
      name: ''
    });
    const props = { isCreatingNewAtrribute: true };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      identifier: 'mock@$ id*',
      name: undefined
    });
    const props = { isCreatingNewAtrribute: true, availableIdentifiers: ['mock-identifer-1', 'mock-identifer-2'] };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when creating a custom attribute with an existing identifer', () => {
    const values = new Map({
      identifier: 'mock-identifer-1',
      name: 'mock-name'
    });
    const props = { isCreatingNewAtrribute: true, availableIdentifiers: ['mock-identifer-1', 'mock-identifer-2'] };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
