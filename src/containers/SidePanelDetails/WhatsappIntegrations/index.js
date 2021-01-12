/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

/**
 *
 * WhatsappIntegrationsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '../../../components/Wrapper';

export default function WhatsappIntegrationsDetailsPanel({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

WhatsappIntegrationsDetailsPanel.propTypes = {
  children: PropTypes.node,
};
