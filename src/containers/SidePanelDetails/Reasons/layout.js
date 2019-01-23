/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * reasonsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function reasonsDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-reasons">{children}</Wrapper>;
}

reasonsDetailsPanel.propTypes = {
  children: PropTypes.any
};
