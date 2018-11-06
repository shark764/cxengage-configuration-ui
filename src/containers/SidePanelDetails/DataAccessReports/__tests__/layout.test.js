/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DataAccessReportsDetailsPanel from '../layout';

describe('<DataAccessReportsDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  let customItemHistorical;
  beforeEach(() => {
    customItem = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: true,
      reportType: 'realtime',
      realtimeReportType: 'standard',
      realtimeReportName: 'IVR Interactions'
    };
    customItemDisabled = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: false,
      reportType: 'realtime',
      realtimeReportType: 'standard',
      realtimeReportName: 'IVR Interactions'
    };
    customItemHistorical = {
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: false,
      reportType: 'historical',
      historicalCatalogName: 'Shared'
    };
  });
  it('renders DataAccessReports detailsPanel', () => {
    const rendered = shallow(
      <DataAccessReportsDetailsPanel
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
  it('renders DataAccessReports detailsPanel with status disabled', () => {
    const rendered = shallow(
      <DataAccessReportsDetailsPanel
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
  it('renders DataAccessReports detailsPanel with historical type', () => {
    const rendered = shallow(
      <DataAccessReportsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItemHistorical}
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
        item={customItem}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
