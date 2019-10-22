/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import RolesForm from '../layout';

describe('<RolesForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <RolesForm
        name="mockName"
        description="mockDescription"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        userHasSharePermission={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <RolesForm
        name="mockName"
        description="mockDescription"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        userHasSharePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
