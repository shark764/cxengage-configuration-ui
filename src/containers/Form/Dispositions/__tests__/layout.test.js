/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispositionsForm from '../layout';

describe('<DispositionsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <DispositionsForm
        name="mockName"
        description="mockDescription"
        externalId="mockExternalId"
        shared={false}
        active={true}
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
      <DispositionsForm
        name="mockName"
        description="mockDescription"
        shared={false}
        active={true}
        externalId="mockExternalId"
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
