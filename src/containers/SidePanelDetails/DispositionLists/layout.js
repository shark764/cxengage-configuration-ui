/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispositionListsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DispositionListsDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DispositionListsDetailsPanel.propTypes = {
  children: PropTypes.any
};
