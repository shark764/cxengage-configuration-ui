/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import GroupsDetailsPanel from '../layout';

describe('<GroupsDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  let defaultFilters;
  let sidePanelReadPermissions;
  let sidePanelUpdatePermissions;
  beforeEach(() => {
    customItem = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: true,
      hasProficiency: true
    };
    customItemDisabled = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: false,
      hasProficiency: true
    };
    defaultFilters = {
      users: [],
      outboundIdentifierLists: [],
      reasonLists: []
    };
    sidePanelReadPermissions = {
      groups: true,
      outboundIdentifierLists: true,
      reasonLists: true
    };
    sidePanelUpdatePermissions = {
      outboundIdentifierLists: true
    };
  });
  it('renders Groups detailsPanel', () => {
    const rendered = shallow(
      <GroupsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        reasonListsItems={[]}
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
        inherited={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Groups detailsPanel with status disabled', () => {
    const rendered = shallow(
      <GroupsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        reasonListsItems={[]}
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItemDisabled}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
        inherited={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Groups detailsPanel with no update permision', () => {
    const rendered = shallow(
      <GroupsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        reasonListsItems={[]}
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
        inherited={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
