/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import SkillsDetailsPanel from '../layout';

describe('<SkillsDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  let customItemNoProficiency;
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
    customItemNoProficiency = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: false,
      hasProficiency: false
    };
  });
  it('renders Skills detailsPanel', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
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
        children={'Mock Child'}
        item={customItemDisabled}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders Skills detailsPanel with historical type', () => {
    const rendered = shallow(
      <SkillsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItemNoProficiency}
        setSelectedSubEntityId={() => {}}
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
        children={'Mock Child'}
        item={customItem}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});