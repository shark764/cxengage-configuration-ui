/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IdentityProvidersDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function IdentityProvidersDetailsPanel({ children }) {
  return (
    <Wrapper
      className="dtpanel-entity-identityProviders"
      data-automation="entityIdentityProviders"
    >
      {children}
    </Wrapper>
  );
}

IdentityProvidersDetailsPanel.propTypes = {
  children: PropTypes.any,
};
