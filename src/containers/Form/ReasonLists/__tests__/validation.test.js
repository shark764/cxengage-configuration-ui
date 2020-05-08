import { formValidation } from '../validation';
import { Map, List } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      reasons: new List([{}])
    });
    const props = {
      isSaving: false,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      reasons: new List()
    });
    const props = {
      isSaving: false,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      reasons: null
    });
    const props = {
      isSaving: false,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('does not return reason error when no reasons are provided while saving', () => {
    const values = new Map({
      name: undefined,
      reasons: null
    });
    const props = {
      isSaving: true,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('does not return reason error when no reasons are provided while fetching', () => {
    const values = new Map({
      name: undefined,
      reasons: null
    });
    const props = {
      isSaving: false,
      isFetching: true,
      initialized: false
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
