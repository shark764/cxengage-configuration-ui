/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ReasonListsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ReasonListsDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-reason-lists">{children}</Wrapper>;
}

ReasonListsDetailsPanel.propTypes = {
  children: PropTypes.any
};
