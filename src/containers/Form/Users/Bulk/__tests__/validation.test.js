import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      status: 'accepted',
      noPassword: 'null',
      defaultIdentityProvider: 'null'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      status: '',
      noPassword: '',
      defaultIdentityProvider: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      status: undefined,
      noPassword: null,
      defaultIdentityProvider: null
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
