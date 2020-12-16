/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CapacityRulesDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CapacityRulesDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

CapacityRulesDetailsPanel.propTypes = {
  children: PropTypes.any,
};
