---
to: src/containers/SidePanelDetails/<%= className %>/layout.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * <%= className %>DetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default function <%= className %>DetailsPanel({
  children
}) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

<%= className %>DetailsPanel.propTypes = {
  children: PropTypes.any
};
