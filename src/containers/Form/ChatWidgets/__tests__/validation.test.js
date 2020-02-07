import { formValidation } from '../validation';
import { Map, fromJS } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      contactPoint: 'mockContactPoint',
      appId: 'mockAppId',
      whitelistedUrls: ['http://www.hello.org']
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object with error messages when wrong values are provided', () => {
    const values = new Map({
      name: '',
      contactPoint: '',
      appId: null,
      whitelistedUrls: fromJS(['http://www.hello.org/hello_world', 'https://good.one'])
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map();
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns clientDisconnectMinutes error messages correctly', () => {
    let values = new Map({
      name: 'mockName',
      contactPoint: 'mockContactPoint',
      appId: 'mockAppId',
      whitelistedUrls: ['http://www.hello.org'],
      clientDisconnectMinutes: 0
    });
    expect(formValidation(values)).toMatchSnapshot();

    values = values.set('clientDisconnectMinutes', 1441);
    expect(formValidation(values)).toMatchSnapshot();
  });
});
