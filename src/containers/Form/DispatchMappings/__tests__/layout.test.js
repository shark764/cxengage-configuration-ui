/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispatchMappingsForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<DispatchMappingsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <DispatchMappingsForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        initialValues={initialValues}
        handleSubmit={() => {}}
        flowId="mockFlowId"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <DispatchMappingsForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        initialValues={initialValues}
        handleSubmit={() => {}}
        flowId="mockFlowId"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
