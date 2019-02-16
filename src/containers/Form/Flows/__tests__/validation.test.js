import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  let props;
  beforeEach(() => {
    props = {
      names: ['mockName1', 'mockName2'],
      initialValues: new Map({ name: 'mockName' })
    };
  });
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      type: 'mockType',
      activeVersion: '0001'
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      description: '',
      type: '',
      activeVersion: ''
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      description: undefined,
      type: null,
      activeVersion: null
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
