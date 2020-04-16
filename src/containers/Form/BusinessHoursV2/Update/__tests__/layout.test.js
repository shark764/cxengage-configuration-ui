/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import BusinessHoursV2UpdateForm from '../layout';

describe('<BusinessHoursV2UpdateForm />', () => {
  it('renders update form', () => {
    const rendered = shallow(
      <BusinessHoursV2UpdateForm
        handleSubmit={() => {}}
        rules={[
          {
            name: 'rule-1',
            description: 'description-1',
            type: 'type-1',
            repeats: 'rep-1',
            every: 'ever-1',
            startDate: 'Wed Jan 15 2020 18:00:00 GMT-0600 (Central Standard Time)',
            on: {
              type: 'day',
              value: 2
            },
            hours: {
              allDay: true
            },
            id: 'id-1'
          },
          {
            name: 'rule-2',
            description: 'description-1',
            type: 'type-2',
            repeats: 'rep-2',
            every: 'ever-2',
            startDate: 'end-1',
            endDate: 'end-2',
            on: {
              type: 'day',
              value: 3
            },
            hours: {
              allDay: false
            },
            id: 'id-2'
          }
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
