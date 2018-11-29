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
      workStationId: '1234',
      extensions: [
        { type: 'pstn', value: '15067994185' },
        { type: 'sip', value: 'sip:01633973283@ns.subdomain.company.com' }
      ]
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
      workStationId: '1234',
      extensions: [
        { type: 'pstn', value: '15067994185' },
        { type: 'sip', value: 'sip:01633973283@ns.subdomain.company.com' }
      ]
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
      workStationId: undefined,
      extensions: [{ type: 'pstn', value: 'rafggfdg' }, { type: 'sip', value: 'asdasd' }]
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
