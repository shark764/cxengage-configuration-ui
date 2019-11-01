/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import UsersBulkActionsForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<UsersBulkActionsForm />', () => {
  it('renders users bulk actions form', () => {
    const rendered = shallow(
      <UsersBulkActionsForm
        active={true}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={true}
        inviteNowIsChecked={true}
        resendInvitationIsChecked={false}
        cancelInvitationIsChecked={false}
        passwordResetIsChecked={false}
        identityProviders={[]}
        groups={fromJS([])}
        skills={fromJS([])}
        isSaving={true}
        isBulkUpdating={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
