/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import OutboundIdentifiersDetailsPanel from './index';
import OutboundIdentifiersForm from '../../Form/OutboundIdentifiers';

export default function OutboundIdentifiersLayout(props) {
  return (
    <OutboundIdentifiersDetailsPanel>
      <OutboundIdentifiersForm />
    </OutboundIdentifiersDetailsPanel>
  );
}
