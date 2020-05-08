import { formValidation } from '../validation';
import { Map, List } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      dispositions: new List([{ dispositionId: 'mockId' }])
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
      dispositions: new List()
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
      dispositions: null
    });
    const props = {
      isSaving: false,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('does not return disposition error when no dispositions are provided while saving', () => {
    const values = new Map({
      name: undefined,
      dispositions: null
    });
    const props = {
      isSaving: true,
      isFetching: false,
      initialized: true
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('does not return disposition error when no dispositions are provided while fetching', () => {
    const values = new Map({
      name: undefined,
      dispositions: null
    });
    const props = {
      isSaving: false,
      isFetching: true,
      initialized: false
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
