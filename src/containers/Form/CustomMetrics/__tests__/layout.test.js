/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import CustomMetricsForm from '../layout';

describe('<CustomMetricsForm />', () => {
  it('renders create customMetric', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="ignored-abandoned-calls"
        slaThreshold="20"
        slaAbandonThreshold="20"
        status={false}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update customMetric', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="ignored-abandoned-calls"
        customMetricsId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        slaThreshold="20"
        slaAbandonThreshold="20"
        status={false}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update customMetric with ignored-abandoned-calls type', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="ignored-abandoned-calls"
        customMetricsId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        slaThreshold="20"
        slaAbandonThreshold="20"
        status={false}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update customMetric saving and inherited with ignored-abandoned-calls type', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="ignored-abandoned-calls"
        customMetricsId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        slaThreshold="20"
        slaAbandonThreshold="20"
        status={false}
        isSaving={true}
        inherited={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update customMetric with count-against-sla type', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="count-against-sla"
        customMetricsId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        slaThreshold="20"
        status={false}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update customMetric saving and inherited with count-against-sla type', () => {
    const rendered = shallow(
      <CustomMetricsForm
        customMetricsName="Custom metric"
        description="Custom metric description"
        customMetricsType="SLA"
        slaAbandonType="count-against-sla"
        customMetricsId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        slaThreshold="20"
        status={false}
        isSaving={true}
        inherited={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
