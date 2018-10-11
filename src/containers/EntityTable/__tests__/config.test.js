import { getTableColumns } from '../config';

describe('getTableColumns', () => {
  it('correctly maps given columns to thier components when all are active', () => {
    expect(
      getTableColumns([
        { name: 'Name', active: true },
        { name: 'Description', active: true },
        { name: 'Status', active: true },
        { name: 'List Type', active: true },
        { name: 'Permissions', active: true },
        { name: 'Metric Type', active: true },
        { name: 'Value', active: true },
        { name: 'channelType', active: true },
        { name: 'flowId', active: true },
        { name: 'Report Type', active: true },
        { name: 'First Name', active: true },
        { name: 'Last Name', active: true },
        { name: 'Platform Status', active: true },
        { name: 'Role', active: true },
        { name: 'Email', active: true },
        { name: 'Presence', active: true },
        { name: 'External Id', active: true },
        { name: 'Invitation Status', active: true },
        { name: 'Proficiency', active: true },
        { name: 'Has Proficiency', active: true }
      ])
    ).toMatchSnapshot();
  });
  it('correctly maps given columns to thier components when half are active', () => {
    expect(
      getTableColumns([
        { name: 'Name', active: true },
        { name: 'Description', active: true },
        { name: 'Status', active: true },
        { name: 'List Type', active: true },
        { name: 'Permissions', active: false },
        { name: 'Metric Type', active: false },
        { name: 'Value', active: false },
        { name: 'channelType', active: false },
        { name: 'flowId', active: false },
        { name: 'Report Type', active: false },
        { name: 'First Name', active: false },
        { name: 'Last Name', active: false },
        { name: 'Platform Status', active: false },
        { name: 'Role', active: false },
        { name: 'Email', active: false },
        { name: 'Presence', active: false },
        { name: 'External Id', active: false },
        { name: 'Invitation Status', active: false },
        { name: 'Proficiency', active: false },
        { name: 'Has Proficiency', active: false }
      ])
    ).toMatchSnapshot();
  });
});
