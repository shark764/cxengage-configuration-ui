---
to: src/containers/Form/<%= name %>/__tests__/validation.test.js
---
import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({

    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({

    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});