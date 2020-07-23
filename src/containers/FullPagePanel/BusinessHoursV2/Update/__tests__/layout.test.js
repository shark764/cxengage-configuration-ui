import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import UpdateBusinessHoursV2 from '../layout';

describe('<UpdateBusinessHoursV2 />', () => {
  const rules = List([
    {
      id: 'rule-id-1',
      name: 'rule name',
      type: 'regular-hours',
      startDate: new Date('1995-12-17'),
      repeats: 'weekly',
      every: 1,
      on: ['monday', 'wednesday', 'friday'],
      hours: {
        allDay: true
      }
    },
    {
      id: 'rule-id-2',
      name: 'rule name 2',
      type: 'blackout-exceptions',
      startDate: new Date('1995-12-17'),
      endDate: new Date('2000-12-17'),
      repeats: 'monthy',
      every: 1,
      on: {
        type: 'last',
        value: 'sunday'
      },
      hours: {
        allDay: false,
        intervals: [
          {
            start: 540,
            end: 1020
          }
        ]
      }
    }
  ]);

  const versions = [
    {
      id: 'version1',
      name: 'version 1',
      version: 'V1'
    },
    {
      id: 'version2',
      name: 'version 2',
      version: 'V2'
    }
  ];

  const drafts = [
    {
      id: 'draft1',
      name: 'draft 1',
      version: 'Draft'
    },
    {
      id: 'draft2',
      name: 'draft 2',
      version: 'Draft'
    }
  ];

  it('renders the component', () => {
    const rendered = shallow(
      <UpdateBusinessHoursV2
        userHasUpdatePermission
        rules={rules}
        versions={versions}
        drafts={drafts}
        userHasViewPermission
        removeListItem={() => {}}
        setSelectedBusinessHourVersion={() => {}}
        selectedBusinessHourVersion="version1"
      />
    );

    expect(rendered).toMatchSnapshot();
  });

  it('it shows as inherited when editing an inherited business hour', () => {
    const rendered = shallow(
      <UpdateBusinessHoursV2
        userHasUpdatePermission
        inherited
        parentTenantName="Parent Tenant"
        rules={rules}
        versions={versions}
        userHasViewPermission
        removeListItem={() => {}}
        setSelectedBusinessHourVersion={() => {}}
      />
    );

    expect(rendered).toMatchSnapshot();
  });

  it('it shows create draft modal', () => {
    const rendered = shallow(
      <UpdateBusinessHoursV2
        userHasUpdatePermission
        rules={rules}
        versions={versions}
        userHasViewPermission
        removeListItem={() => {}}
        setSelectedBusinessHourVersion={() => {}}
        drafts={drafts}
        isCreatingDraft
        createDraft={() => {}}
        businessHoursId="business hour id"
      />
    );

    rendered.setState({ isCreateModalOpen: true });

    expect(rendered).toMatchSnapshot();
  });

  it('it shows copy modal to create a new draft within the same business hour', () => {
    const rendered = shallow(
      <UpdateBusinessHoursV2
        userHasUpdatePermission
        rules={rules}
        versions={versions}
        userHasViewPermission
        removeListItem={() => {}}
        setSelectedBusinessHourVersion={() => {}}
        drafts={drafts}
        createDraft={() => {}}
        businessHoursList={[
          {
            id: 'business-hour-id ',
            name: 'business hour 1'
          },
          {
            id: 'business-hours-id2',
            name: 'business hour 2'
          }
        ]}
        businessHoursId="business-hour-id"
      />
    );

    rendered.setState({
      copyVersionId: 'version1',
      isCopyModalOpen: true
    });

    expect(rendered).toMatchSnapshot();
  });

  it('it shows copy modal to copy a version/draft to another business hour', () => {
    const rendered = shallow(
      <UpdateBusinessHoursV2
        userHasUpdatePermission
        rules={rules}
        versions={versions}
        userHasViewPermission
        removeListItem={() => {}}
        setSelectedBusinessHourVersion={() => {}}
        drafts={drafts}
        createDraft={() => {}}
        businessHoursList={[
          {
            id: 'business-hour-id ',
            name: 'business hour 1'
          },
          {
            id: 'business-hours-id2',
            name: 'business hour 2'
          }
        ]}
        businessHoursId="business-hour-id"
      />
    );

    rendered.setState({
      copyVersionId: 'version1',
      isCopyModalOpen: true,
      isCopyVersion: true
    });

    expect(rendered).toMatchSnapshot();
  });
});
