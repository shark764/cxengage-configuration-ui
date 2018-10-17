/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import GroupsForm from '../layout';

describe('<GroupsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <GroupsForm
        name="mockName"
        description="mockDescription"
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <GroupsForm
        name="mockName"
        description="mockDescription"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
