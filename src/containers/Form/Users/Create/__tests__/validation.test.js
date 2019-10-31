import { formValidation } from '../validation';
import { Map } from 'immutable';
import { fromJS } from 'immutable';

const props = {
  tenantUsers: fromJS([
    {
      email: 'mockEmail@email.com'
    }
  ]),
  setSelectedEntityId: id => true
};

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      email: 'mockEmail@email.com',
      platformRoleId: 'mockPlatformRoleId',
      roleId: 'mockRoleId'
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      email: '',
      platformRoleId: '',
      roleId: ''
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      email: undefined,
      platformRoleId: null,
      roleId: null
    });
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
