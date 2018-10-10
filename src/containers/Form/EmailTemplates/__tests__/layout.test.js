/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import EmailTemplatesForm from '../layout';

describe('<EmailTemplatesForm />', () => {
  let customTemplates;
  beforeEach(() => {
    customTemplates = [
      "Hello {{{user-first-name}}} {{{user-last-name}}}:↵↵You've been invited to following tenant on {{{product-name}}}: {{{tenant-name}}}↵↵Simply log in with your existing {{{product-name}}} username, {{{username}}}.↵↵Please click the following link to get started on accepting this invitation using single sign on: {{{sso-config-login-url}}}↵↵Note that the link above will expire after 24 hours. If you have forgotten your password or have issues please contact your system administrator for assistance.↵↵Thank you,The Serenova Team!"
    ];
  });
  it('renders default email', () => {
    const rendered = shallow(
      <EmailTemplatesForm
        email="default"
        templates={customTemplates}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders custom email', () => {
    const rendered = shallow(
      <EmailTemplatesForm
        email="custom"
        shared={false}
        subject="Welcome to CxEngage"
        body="Hello {{{user-first-name}}} {{{user-last-name}}}:↵↵You've been invited to following tenant on {{{product-name}}}: {{{tenant-name}}}↵↵Simply log in with your existing {{{product-name}}} username, {{{username}}}.↵↵Please click the following link to get started on accepting this invitation using single sign on: {{{sso-config-login-url}}}↵↵Note that the link above will expire after 24 hours. If you have forgotten your password or have issues please contact your system administrator for assistance.↵↵Thank you,The Serenova Team!"
        templates={customTemplates}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
