import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import DraftFullPagePanel from '../layout';

describe('<DraftFullPagePanel />', () => {
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

  it('renders the component', () => {
    const rendered = shallow(
      <DraftFullPagePanel
        cancel={() => {}}
        saveDraft={() => {}}
        publishDraft={() => {}}
        saveBeforePublish={() => {}}
        userHasUpdatePermission
        formsAreDirty
        shouldPublish
        rules={rules}
        addRule={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders the publish modal within the component', () => {
    const rendered = shallow(
      <DraftFullPagePanel
        cancel={() => {}}
        saveDraft={() => {}}
        publishDraft={() => {}}
        saveBeforePublish={() => {}}
        userHasUpdatePermission
        formsAreDirty
        shouldPublish
        rules={rules}
        addRule={() => {}}
        draftName="Draft Name"
        versions={[
          {
            name: 'version 1'
          },
          {
            name: 'version 2'
          }
        ]}
      />
    );
    rendered.setState({ isPublishModalOpen: true });
    expect(rendered).toMatchSnapshot();
  });
});
