import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  const props = { initialValues: new Map({ id: '0000' }) };
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      type: 'mockType',
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      type: '',
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      type: null,
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
