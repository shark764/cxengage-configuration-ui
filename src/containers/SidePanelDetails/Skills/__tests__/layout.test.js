/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import SkillsDetailsPanel from '../layout';

describe('<SkillsDetailsPanel />', () => {
  let defaultFilters;
  let sidePanelReadPermissions;
  let sidePanelUpdatePermissions;
  beforeEach(() => {
    defaultFilters = {
      users: [],
      outboundIdentifierLists: []
    };
    sidePanelReadPermissions = {
      skills: true,
      outboundIdentifierLists: true
    };
    sidePanelUpdatePermissions = {
      outboundIdentifierLists: true
    };
  });
  it('renders Skills detailsPanel', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        children={'Mock Child'}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Skills detailsPanel with status disabled', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        children={'Mock Child'}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Skills detailsPanel with no proficiency', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        children={'Mock Child'}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Skills detailsPanel with no update permision', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        usersItems={[]}
        outboundIdentifierListsItems={[]}
        children={'Mock Child'}
        setSelectedSubEntityId={() => {}}
        defaultFilters={defaultFilters}
        sidePanelReadPermissions={sidePanelReadPermissions}
        sidePanelUpdatePermissions={sidePanelUpdatePermissions}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
