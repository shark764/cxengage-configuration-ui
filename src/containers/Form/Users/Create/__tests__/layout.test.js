/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import UsersForm from '../layout';

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
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create user saving and inherited', () => {
    const rendered = shallow(
      <UsersForm
        email="mockEmail"
        platformRoleId="mockPlatformRoleId"
        roleId="mockRoleId"
        firstName="mockFirstName"
        lastName="mockLastName"
        externalId="1234"
        workStationId="1234"
        active={true}
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={true}
        inherited={true}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create user without create permision', () => {
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
        platformRoles={[]}
        tenantRoles={[]}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
