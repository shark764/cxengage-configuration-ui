/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * QueuesDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function QueuesDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-queues">{children}</Wrapper>;
}

QueuesDetailsPanel.propTypes = {
  children: PropTypes.any
};
