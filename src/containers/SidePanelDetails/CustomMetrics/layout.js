/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CustomMetricsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CustomMetricsDetailsPanel({ children }) {
  return <Wrapper id="dtpanel-custom-metrics">{children}</Wrapper>;
}

CustomMetricsDetailsPanel.propTypes = {
  children: PropTypes.any
};
