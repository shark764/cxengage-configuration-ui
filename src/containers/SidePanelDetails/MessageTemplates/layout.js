/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * MessageTemplatesDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function MessageTemplatesDetailsPanel({ children }) {
  return <Wrapper className="dtpanel-entity-message-templates">{children}</Wrapper>;
}

MessageTemplatesDetailsPanel.propTypes = {
  children: PropTypes.any
};
