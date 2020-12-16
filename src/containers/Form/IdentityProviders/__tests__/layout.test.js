/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import IdentityProvidersForm from '../layout';
import { getIntlContext } from '../../../../utils/testUtils';

const initialValues = {
  get: () => {},
};

const identityProviderTypes = [{ label: 'URL', value: 'url' }];

describe('<IdentityProvidersForm />', () => {
  it('renders create form', () => {
    const rendered = (
      <IdentityProvidersForm
        intl={getIntlContext().formatMessage}
        name="mockName"
        description="mockDescription"
        idpType="url"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        identityProviderTypes={identityProviderTypes}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = (
      <IdentityProvidersForm
        intl={getIntlContext().formatMessage}
        name="mockName"
        description="mockDescription"
        idpType="url"
        emailMapping="mockEmailMapping"
        metadataUrl="mockMetadataUrl"
        identityProvider="00000000000000000000"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        initialValues={initialValues}
        identityProviderTypes={identityProviderTypes}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
