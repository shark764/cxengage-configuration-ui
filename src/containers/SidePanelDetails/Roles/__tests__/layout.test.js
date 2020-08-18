/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { RolesDetailsPanel } from '../layout';

describe('<RolesDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  let sidePanelUpdatePermissions;
  beforeEach(() => {
    customItem = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription'
    };
    customItemDisabled = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: false
    };
    sidePanelUpdatePermissions = {
      users: true
    };
  });
  it('renders Roles detailsPanel', () => {
    const rendered = shallow(
      <RolesDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Roles detailsPanel with status disabled', () => {
    const rendered = shallow(
      <RolesDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItemDisabled}
        setSelectedSubEntityId={() => {}}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Roles detailsPanel with no update permision', () => {
    const rendered = shallow(
      <RolesDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
        sidePanelUpdatePermissions={!sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
