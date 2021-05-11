/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FacebookIntegrationsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '../../../components/Wrapper';

export default function FacebookIntegrationsDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

FacebookIntegrationsDetailsPanel.propTypes = {
  children: PropTypes.node,
};
