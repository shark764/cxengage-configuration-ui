/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DataAccessReportsForm from '../layout';

describe('<DataAccessReportsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="realtime"
        realtimeReportType="standard"
        realtimeReportName="IVR Interactions"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create form with historical type', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="historical"
        historicalCatalogName="Visualizations"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="realtime"
        realtimeReportType="standard"
        realtimeReportName="IVR Interactions"
        id="0000-0000-0000-0000-0000"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form with custom realtime type', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="realtime"
        realtimeReportType="custom"
        realtimeReportName="My Own IVR Interactions"
        id="0000-0000-0000-0000-0000"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form with historical type', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="historical"
        historicalCatalogName="Visualizations"
        id="0000-0000-0000-0000-0000"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form without update permision', () => {
    const rendered = shallow(
      <DataAccessReportsForm
        name="mockName"
        description="mockDescription"
        reportType="historical"
        historicalCatalogName="Visualizations"
        id="0000-0000-0000-0000-0000"
        folders={[]}
        dashboards={[]}
        standardReports={[]}
        isSaving={false}
        userHasUpdatePermission={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
