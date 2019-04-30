/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifiersDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function OutboundIdentifiersDetailsPanel({ children }) {
  return <Wrapper id="dtpanel-outbound-identifiers">{children}</Wrapper>;
}

OutboundIdentifiersDetailsPanel.propTypes = {
  children: PropTypes.any
};
