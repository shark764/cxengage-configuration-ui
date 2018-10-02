---
to: src/containers/Form/<%= name %>/__tests__/layout.test.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import <%= name %>Form from '../layout';

describe('<<%= name %>Form />', () => {
  let testTypes;
  beforeEach(() => {
    testTypes = [
      {
        label: 'custom label',
        value: 'custom value'
      },
    ];
  });
  it('renders create form', () => {
    const rendered = shallow(
      <<%= name %>Form
        name="mockName"
        description="mockDescription"
        type={testTypes}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <<%= name %>Form
        name="mockName"
        description="mockDescription"
        type={testTypes}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
