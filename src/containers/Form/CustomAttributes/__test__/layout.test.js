/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import CustomAttributesForm from '../layout';

describe('<CustomAttributesForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <CustomAttributesForm
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
        userHasUpdatePermission={true}
        isCreatingNewAtrribute={true}
        initialValueFieldVal=""
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <CustomAttributesForm
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
        userHasUpdatePermission={true}
        isCreatingNewAtrribute={false}
        initialValueFieldVal="nil"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
