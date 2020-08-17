/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ContactAttributesDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

ContactAttributesDetailsPanel.propTypes = {
  children: PropTypes.any
};
