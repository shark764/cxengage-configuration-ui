/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import SlasForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<SlasForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <SlasForm
        name="mockName"
        description="mockDescription"
        activeVersion="mockActiveVersion"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        userHasUpdatePermission={true}
        userHasSharePermission={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <SlasForm
        name="mockName"
        description="mockDescription"
        activeVersion="mockActiveVersion"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        userHasUpdatePermission={true}
        userHasSharePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
