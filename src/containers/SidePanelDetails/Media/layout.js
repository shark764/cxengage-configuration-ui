/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * MediaDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function MediaDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

MediaDetailsPanel.propTypes = {
  children: PropTypes.any,
};
