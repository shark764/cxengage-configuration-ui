/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CustomMetricsDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail } from 'cx-ui-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CustomMetricsDetailsPanel({
  children,
  userHasUpdatePermission,
  item: { name, description, customMetricsType, active, slaThreshold, slaAbandonType, slaAbandonThreshold }
}) {
  return (
    <Wrapper id="dtpanel-custom-metrics">
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
          <Detail label="Custom Metric Type" value={customMetricsType} />
          <Detail label="Status" value={active ? 'Enabled' : 'Disabled'} />
          <Detail label="SLA Threshold" value={String(slaThreshold)} />
          <Detail label="SLA Abandon Type" value={slaAbandonType} />
          {slaAbandonType === 'ignored-abandoned-calls' ? (
            <Detail label="SLA Abandon Threshold" value={String(slaAbandonThreshold)} />
          ) : null}
        </Fragment>
      )}
    </Wrapper>
  );
}

CustomMetricsDetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    customMetricsType: PropTypes.string,
    active: PropTypes.bool,
    slaThreshold: PropTypes.number,
    slaAbandonType: PropTypes.sting,
    slaAbandonThreshold: PropTypes.number
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any
};
