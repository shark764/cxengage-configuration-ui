/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import UsersForm from '../layout';

const initialValues = {
  get: () => {}
};

describe('<UsersForm />', () => {
  it('renders create user', () => {
    const rendered = shallow(
      <UsersForm
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={false}
        status="enabled"
        scenario="invite:new:user"
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={true}
        changeUserInviteStatus={() => {}}
        userHasNameSet={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update user', () => {
    const rendered = shallow(
      <UsersForm
        id="57083781-332d-11e6-8dd4-c88eee4d9f61"
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={true}
        status="enabled"
        scenario="invite:existing:user"
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={true}
        changeUserInviteStatus={() => {}}
        userHasNameSet={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update user with no name set', () => {
    const rendered = shallow(
      <UsersForm
        id="57083781-332d-11e6-8dd4-c88eee4d9f61"
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={true}
        status="enabled"
        scenario="invite:existing:user"
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={true}
        changeUserInviteStatus={() => {}}
        userHasNameSet={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update user saving and inherited', () => {
    const rendered = shallow(
      <UsersForm
        id="57083781-332d-11e6-8dd4-c88eee4d9f61"
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={true}
        status="enabled"
        scenario="invite:existing:user"
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={true}
        inherited={true}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={true}
        changeUserInviteStatus={() => {}}
        userHasNameSet={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update user without update permision', () => {
    const rendered = shallow(
      <UsersForm
        id="57083781-332d-11e6-8dd4-c88eee4d9f61"
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={true}
        status="enabled"
        scenario="invite:existing:user"
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={false}
        handleSubmit={() => {}}
        initialValues={initialValues}
        displayResetPassword={false}
        changeUserInviteStatus={() => {}}
        userHasNameSet={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
