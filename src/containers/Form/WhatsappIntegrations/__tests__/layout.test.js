/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import WhatsappIntegrationsForm from '../layout';

const initialValues = {
  get: () => {},
};

describe('<WhatsappIntegrationsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <WhatsappIntegrationsForm
        whatsappId="0000-0000-0000-0000-0000"
        name="mockName"
        description="mockDescription"
        clientDisconnectMinutes={15}
        initialValues={initialValues}
        whatsappAppsFetching={false}
        whatsappApps={[{ value: 'mockValue', label: 'mockLabel' }]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <WhatsappIntegrationsForm
        name="mockName"
        description="mockDescription"
        type="whatsapp"
        id="0000-0000-0000-0000-0000"
        appId="1000-0000-0000-0000-0000"
        clientDisconnectMinutes={15}
        initialValues={initialValues}
        whatsappAppsFetching={false}
        whatsappApps={[{ value: 'mockValue', label: 'mockLabel' }]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
