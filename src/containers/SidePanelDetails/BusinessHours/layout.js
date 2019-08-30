/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BusinessHoursDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function BusinessHoursDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

BusinessHoursDetailsPanel.propTypes = {
  children: PropTypes.any
};
