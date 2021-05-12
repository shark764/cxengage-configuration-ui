import { formValidation } from '../validation';
import { Map } from 'immutable';

const props = {
  initialValues:  undefined
};

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      appId: 'mockAppId',
      facebookAppId: 'mockFacebookAppId',
      facebookAppSecret: 'mockFacebookAppSecret',
      facebookPageId: 'mockFacebookPageId',
      facebookUserAccessToken: 'mockFacebookUserAccessToken',
      clientDisconnectMinutes: 1,
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      appId: '',
      facebookAppId: '',
      facebookAppSecret: '',
      facebookPageId: '',
      facebookUserAccessToken: '',
      clientDisconnectMinutes: null,
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      appId: undefined,
      facebookAppId: undefined,
      facebookAppSecret: undefined,
      facebookPageId: undefined,
      facebookUserAccessToken: undefined,
      clientDisconnectMinutes: 1441,
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
