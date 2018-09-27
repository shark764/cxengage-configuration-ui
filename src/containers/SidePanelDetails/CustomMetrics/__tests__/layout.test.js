/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import CustomMetricsDetailsPanel from '../layout';

describe('<CustomMetricsDetailsPanel />', () => {
  let customItem;
  let customItemDisabled;
  beforeEach(() => {
    customItem = {
      name: "SLA",
      description: "Test",
      customMetricsType: "SLA",
      active: true,
      slaThreshold: 20,
      slaAbandonType: "ignored-abandoned-calls",
      slaAbandonThreshold: 20
    };
    customItemDisabled = {
      name: "SLA",
      description: "Test",
      customMetricsType: "SLA",
      active: false,
      slaThreshold: 20,
      slaAbandonType: "ignored-abandoned-calls",
      slaAbandonThreshold: 20
    };
  });
  it('renders customMetrics detailsPanel', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        active={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders customMetrics detailsPanel with no update permision', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
        active={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders customMetrics detailsPanel with no update permision and active disabled', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="details-panel-id"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItemDisabled}
        active={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
