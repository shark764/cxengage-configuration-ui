import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      externalId: 'mockExternalId',
      active: true,
      shared: false
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      description: '',
      externalId: '',
      active: true,
      shared: false
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      description: undefined,
      externalId: undefined,
      active: null,
      shared: null
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
