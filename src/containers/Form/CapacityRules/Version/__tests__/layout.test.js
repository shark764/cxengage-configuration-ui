/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import VersionForm from '../layout';

describe('<VersionForm />', () => {
  it('renders the component of any capacity rule', () => {
    const rendered = shallow(
      <VersionForm
        name="mockName"
        ruleQuantifier="any"
        isSaving={false}
        disabled={false}
        intl={{
          formatMessage: ({ defaultMessage }) => defaultMessage,
        }}
        initialValues={Map({
          name: '',
          rule: new Map({
            groups: new List(),
          }),
          rules: new List(),
        })}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders the component of percentage capacity rule', () => {
    const rendered = shallow(
      <VersionForm
        name="mockName"
        ruleQuantifier="percentage"
        isSaving={false}
        disabled={false}
        intl={{
          formatMessage: ({ defaultMessage }) => defaultMessage,
        }}
        initialValues={Map({
          name: '',
          rule: new Map({
            groups: new List(),
          }),
          rules: new List(),
        })}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
