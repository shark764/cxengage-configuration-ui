/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FlowsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FlowsDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-flows">{children}</Wrapper>;
}

FlowsDetailsPanel.propTypes = {
  children: PropTypes.any
};
