/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ReasonsDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-reasons">{children}</Wrapper>;
}

ReasonsDetailsPanel.propTypes = {
  children: PropTypes.any
};
