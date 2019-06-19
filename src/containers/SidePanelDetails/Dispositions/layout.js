/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispositionsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DispositionsDetailsPanel({ children }) {
  return <Wrapper data-automation="entityDispositions">{children}</Wrapper>;
}

DispositionsDetailsPanel.propTypes = {
  children: PropTypes.any
};
