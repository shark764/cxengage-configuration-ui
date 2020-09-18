/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ContactAttributesForm from '../layout';

describe('<ContactAttributesForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <ContactAttributesForm
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
        userHasUpdatePermission={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <ContactAttributesForm
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
        userHasUpdatePermission={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
