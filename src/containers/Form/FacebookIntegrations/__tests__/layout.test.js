/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import FacebookIntegrationsForm from '../layout';

const initialValues = {
  get: () => {},
};

describe('<FacebookIntegrationsForm />', () => {
  it('renders form when initialValues is null', () => {
    const rendered = shallow(
      <FacebookIntegrationsForm
          initialValues={null}
      />
    );
    expect(rendered).toMatchSnapshot();
  });

  it('renders create form', () => {
    const rendered = shallow(
      <FacebookIntegrationsForm
        name="mockName"
        description="mockDescription"
        appId="mockAppId"
        facebookAppId="mockFacebookAppId"
        facebookAppSecret="mockFacebookAppSecret"
        facebookPageId="mockFacebookPageId"
        facebookUserAccessToken="mockFacebookUserAccessToken"
        clientDisconnectMinutes={1}
        initialValues={initialValues}
        digitalChannelsAppsFetching={false}
        digitalChannelsAppIds={[{ value: 'mockValue', label: 'mockLabel' }]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <FacebookIntegrationsForm
        name="mockName"
        description="mockDescription"
        appId="mockAppId"
        facebookAppId="mockFacebookAppId"
        facebookAppSecret="mockFacebookAppSecret"
        facebookPageId="mockFacebookPageId"
        facebookUserAccessToken="mockFacebookUserAccessToken"
        clientDisconnectMinutes={1}
        initialValues={initialValues}
        digitalChannelsAppsFetching={false}
        digitalChannelsAppIds={[{ value: 'mockValue', label: 'mockLabel' }]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
