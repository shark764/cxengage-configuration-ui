/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import CapacityRulesDetailsPanel from '../layout';

describe('<CapacityRulesDetailsPanel />', () => {
  it('renders capacityRules detailsPanel', () => {
    const rendered = shallow(
      <CapacityRulesDetailsPanel
        intl={{ formatMessage: ({ defaultMessage }) => defaultMessage }}
        className="details-panel"
        children={'Mock Child'}
        tableFields={[
          {
            test: 'whatever',
          },
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
