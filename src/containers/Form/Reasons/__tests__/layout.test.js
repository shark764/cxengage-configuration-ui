/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ReasonsForm from '../layout';

describe('<ReasonsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <ReasonsForm
        name="mockName"
        description="mockDescription"
        externalId={'mockExternalId'}
        userHasUpdatePermission={true}
        userHasSharePermission={false}
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
      <ReasonsForm
        name="mockName"
        description="mockDescription"
        externalId={'mockExternalId'}
        userHasUpdatePermission={true}
        userHasSharePermission={true}
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
