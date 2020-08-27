import { formValidation } from '../validation';
import { Map, List } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      layout: new List([{ name: 'mockAttributeName' }])
    });
    const props = {
      isCurrentFormMissingMandatoryAttributes: false
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      layout: new List()
    });
    const props = {
      isCurrentFormMissingMandatoryAttributes: false
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      layout: null
    });
    const props = {
      isCurrentFormMissingMandatoryAttributes: false
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
