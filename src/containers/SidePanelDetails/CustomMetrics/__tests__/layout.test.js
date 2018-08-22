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
      customMetricsName: 'SLA',
      description: 'Test',
      customMetricsType: 'SLA',
      customMetricsId: '7a11c534-cc2e-11n8-76hd-9440dab8147',
      status: true,
      slaThreshold: 20,
      slaAbandonType: 'ignored-abandoned-calls',
      slaAbandonThreshold: 20
    };
    customItemDisabled = {
      customMetricsName: 'SLA',
      description: 'Test',
      customMetricsType: 'SLA',
      customMetricsId: '7a11c534-cc2e-11n8-76hd-9440dab8147',
      status: false,
      slaThreshold: 20,
      slaAbandonType: 'ignored-abandoned-calls',
      slaAbandonThreshold: 20
    };
  });
  it('renders customMetrics detailsPanel', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="7a96c534-cc2e-11n8-88b9-9440dab8141"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        item={customItem}
        status={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders customMetrics detailsPanel with no update permision', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="7a96c534-cc2e-11n8-88b9-9440dab8141"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItem}
        status={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders customMetrics detailsPanel with no update permision and status disabled', () => {
    const rendered = shallow(
      <CustomMetricsDetailsPanel
        id="7a96c534-cc2e-11n8-88b9-9440dab8141"
        className="details-panel"
        userHasUpdatePermission={false}
        children={'Mock Child'}
        item={customItemDisabled}
        status={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
