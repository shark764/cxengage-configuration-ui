import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      email: 'mockEmail',
      platformRoleId: 'mockPlatformRoleId',
      roleId: 'mockRoleId'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      email: '',
      platformRoleId: '',
      roleId: ''
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      email: undefined,
      platformRoleId: null,
      roleId: null
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
