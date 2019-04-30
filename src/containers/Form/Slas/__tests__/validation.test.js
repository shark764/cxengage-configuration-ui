import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      description: 'mockDescription',
      activeVersion: 'mockActiveVersion',
      versionName: 'mockVersionName',
      abandonType: 'mockAbandonType',
      slaThreshold: 20,
      abandonThreshold: 20
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      description: '',
      activeVersion: '',
      versionName: '',
      abandonType: '',
      slaThreshold: '',
      abandonThreshold: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      description: undefined,
      activeVersion: null,
      versionName: undefined,
      abandonType: null,
      slaThreshold: 'abcd',
      abandonThreshold: 'wxyz'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
