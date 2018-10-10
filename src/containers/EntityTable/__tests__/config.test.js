import { getTableColumns } from '../config';

describe('getTableColumns', () => {
  it('correctly maps given columns to thier components when all are active', () => {
    expect(getTableColumns([
      {name: 'Name', active: true},
      {name: 'Description', active: true},
      {name: 'Status', active: true},
      {name: 'List Type', active: true},
      {name: 'Permissions', active: true},
      {name: 'Metric Type', active: true},
      {name: 'Value', active: true},
      {name: 'channelType', active: true},
      {name: 'flowId', active: true},
    ])).toMatchSnapshot();
  });
  it('correctly maps given columns to thier components when half are active', () => {
    expect(getTableColumns([
      {name: 'Name', active: true},
      {name: 'Description', active: true},
      {name: 'Status', active: true},
      {name: 'List Type', active: true},
      {name: 'Permissions', active: false},
      {name: 'Metric Type', active: false},
      {name: 'Value', active: false},
      {name: 'channelType', active: false},
      {name: 'flowId', active: false},
    ])).toMatchSnapshot();
  });
});
