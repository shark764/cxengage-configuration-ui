import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      type: 'mockType',
      label: 'mockLabel'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      type: '',
      label: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      type: null,
      label: undefined
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
