/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UsersDetailsPanel({ children }) {
  return <Wrapper id="dtpanel-users">{children}</Wrapper>;
}

UsersDetailsPanel.propTypes = {
  children: PropTypes.any
};
