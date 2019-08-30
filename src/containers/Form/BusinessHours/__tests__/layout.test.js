/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import BusinessHoursForm from '../layout';

describe('<BusinessHoursForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <BusinessHoursForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        timezones={[
          {
            timezone: 'a',
            offset: 6
          },
          {
            timezone: 'b',
            offset: 7
          }
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <BusinessHoursForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        timezones={[
          {
            timezone: 'a',
            offset: 6
          },
          {
            timezone: 'b',
            offset: 7
          }
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
