/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DataAccessReportsDetailsPanel from '../layout';

describe('<DataAccessReportsDetailsPanel />', () => {
  let customTableItems;
  beforeEach(() => {
    customTableItems = [
      {
        id: 'mockId',
        name: 'mockName',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
        status: 'enabled'
      }
    ];
  });
  it('renders DataAccessReports detailsPanel', () => {
    const rendered = shallow(
      <DataAccessReportsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        tableItems={customTableItems}
        tableFields={[]}
        removeListItem={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders DataAccessReports detailsPanel with no update permision', () => {
    const rendered = shallow(
      <DataAccessReportsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        tableItems={customTableItems}
        tableFields={[]}
        removeListItem={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
