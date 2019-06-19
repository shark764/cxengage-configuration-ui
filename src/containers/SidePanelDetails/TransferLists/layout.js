/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * TransferListsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function TransferListsDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-transfer-lists">{children}</Wrapper>;
}

TransferListsDetailsPanel.propTypes = {
  children: PropTypes.any
};

export default TransferListsDetailsPanel;
