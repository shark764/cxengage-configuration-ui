---
to: src/containers/Form/<%= Name %>/__tests__/validation.test.js
---
import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      type: 'mockType'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      description: '',
      type: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      description: undefined,
      type: null
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});