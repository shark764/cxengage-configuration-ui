/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TenantsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function TenantsDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

TenantsDetailsPanel.propTypes = {
  children: PropTypes.any
};
