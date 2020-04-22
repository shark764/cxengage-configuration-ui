/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import IntegrationsForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<IntegrationsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <IntegrationsForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <IntegrationsForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
