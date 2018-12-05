/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import UsersDetailsPanel from '../layout';

describe('<UsersDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  let defaultFilters;
  beforeEach(() => {
    customItem = {
      email: 'mockEmail',
      platformRoleId: 'mockPlatformRoleId',
      roleId: 'mockRoleId',
      active: true,
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      externalId: '1234',
      workStationId: '1234'
    };
    customItemDisabled = {
      email: 'mockEmail',
      platformRoleId: 'mockPlatformRoleId',
      roleId: 'mockRoleId',
      active: false,
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      externalId: '1234',
      workStationId: '1234'
    };
    defaultFilters = {
      skills: [],
      groups: [],
      reasonLists: [],
      messageTemplates: [],
      transferLists: [],
      outboundIdentifierLists: []
    };
  });
  it('renders users detailsPanel', () => {
    const rendered = shallow(
      <UsersDetailsPanel
        id="0000-0000-0000-0000-0000"
        className="details-panel"
        userHasUpdatePermission={true}
        skillsItems={[]}
        groupsItems={[]}
        reasonListsItems={[]}
        outboundIdentifierListsItems={[]}
        transferListsItems={[]}
        messageTemplatesItems={[]}
        children={'Mock Child'}
        item={customItem}
        defaultFilters={defaultFilters}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders users detailsPanel with no update permision', () => {
    const rendered = shallow(
      <UsersDetailsPanel
        id="0000-0000-0000-0000-0000"
        className="details-panel"
        userHasUpdatePermission={false}
        skillsItems={[]}
        groupsItems={[]}
        reasonListsItems={[]}
        outboundIdentifierListsItems={[]}
        transferListsItems={[]}
        messageTemplatesItems={[]}
        children={'Mock Child'}
        item={customItem}
        defaultFilters={defaultFilters}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders users detailsPanel with no update permision and active disabled', () => {
    const rendered = shallow(
      <UsersDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        skillsItems={[]}
        groupsItems={[]}
        reasonListsItems={[]}
        outboundIdentifierListsItems={[]}
        transferListsItems={[]}
        messageTemplatesItems={[]}
        children={'Mock Child'}
        item={customItemDisabled}
        active={false}
        defaultFilters={defaultFilters}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
