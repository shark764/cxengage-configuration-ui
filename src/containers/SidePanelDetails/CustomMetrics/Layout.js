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
  id,
  className,
  item: {
    customMetricsName,
    description,
    customMetricsType,
    customMetricsId,
    status,
    slaThreshold,
    slaAbandonType,
    slaAbandonThreshold
  }
}) {
  return (
    <Wrapper id={id} className={className}>
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={customMetricsName} />
          <Detail label="Description" value={description} />
          <Detail label="Custom Metric Type" value={customMetricsType} />
          <Detail label="ID" value={customMetricsId} />
          <Detail label="Status" value={status ? 'Enabled' : 'Disabled'} />
          <Detail label="SLA Threshold" intValue={slaThreshold} />
          <Detail label="SLA Abandon Type" value={slaAbandonType} />
          <Detail label="SLA Abandon Threshold" intValue={slaAbandonThreshold} />
        </Fragment>
      )}
    </Wrapper>
  );
}

CustomMetricsDetailsPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.shape({
    customMetricsName: PropTypes.string,
    description: PropTypes.string,
    customMetricsType: PropTypes.string,
    customMetricsId: PropTypes.string,
    status: PropTypes.bool,
    slaThreshold: PropTypes.number,
    slaAbandonType: PropTypes.sting,
    slaAbandonThreshold: PropTypes.number
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any
};
