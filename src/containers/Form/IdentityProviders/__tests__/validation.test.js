import { formValidation } from '../validation';
import { Map } from 'immutable';
import { getIntlContext } from '../../../../utils/testUtils';

const props = {
  intl: getIntlContext()
};

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      name: 'mockName',
      identityProviderType: 'url',
      emailMapping: 'mockEmailMapping',
      metadataUrl: 'mockMetadataUrl',
      metadataFile: '<md:EntityDescriptor>mockXml</md:EntityDescriptor>',
      identityProvider: '00000000000000000000'
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      name: '',
      identityProviderType: '',
      emailMapping: '',
      metadataUrl: ''
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      identityProviderType: null,
      emailMapping: undefined,
      metadataUrl: undefined
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
