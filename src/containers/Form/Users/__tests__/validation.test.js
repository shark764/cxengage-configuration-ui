import { formValidation } from '../validation';
import { Map } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when required fields are provided', () => {
    const values = new Map({
      email: 'mockEmail',
      platformRoleId: 'mockPlatformRoleId',
      roleId: 'mockRoleId',
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      externalId: '1234',
      workStationId: '1234'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when required fields are not provided', () => {
    const values = new Map({
      email: '',
      platformRoleId: '',
      roleId: '',
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      externalId: '1234',
      workStationId: '1234'
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      email: undefined,
      platformRoleId: null,
      roleId: null,
      firstName: undefined,
      lastName: undefined,
      externalId: undefined,
      workStationId: undefined
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
