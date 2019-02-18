/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DispatchMappingsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default function DispatchMappingsDetailsPanel({
  children
}) {
  return (
    <Wrapper className="dtpanel-entity-dispatch-mappings">
      {children}
    </Wrapper>
  );
}

DispatchMappingsDetailsPanel.propTypes = {
  children: PropTypes.any
};
