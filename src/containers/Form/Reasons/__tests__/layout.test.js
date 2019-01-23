/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import reasonsForm from '../layout';

describe('<reasonsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <reasonsForm
        name="mockName"
        description="mockDescription"
        externalId={'mockExternalId'}
        shared={false}
        active={true}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <reasonsForm
        name="mockName"
        description="mockDescription"
        externalId={'mockExternalId'}
        shared={false}
        active={true}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
