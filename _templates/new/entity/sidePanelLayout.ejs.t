---
to: src/containers/SidePanelDetails/<%= Name %>/layout.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * <%= Name %>DetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
 
export default function <%= Name %>DetailsPanel({
  children
}) {
  return (
    <Wrapper className="dtpanel-entity-<%= kebabName %>">
      {children}
    </Wrapper>
  );
}

<%= Name %>DetailsPanel.propTypes = {
  children: PropTypes.any
};
