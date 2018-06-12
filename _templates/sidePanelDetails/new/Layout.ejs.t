---
to: src/containers/SidePanelDetails/<%= name %>/Layout.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import <%= name %>DetailsPanel from './index';
import <%= name %>Form from '../../Form/<%= name %>';

export default function <%= name %>Layout(props) {
  return (
    <<%= name %>DetailsPanel>
      <<%= name %>Form />
    </<%= name %>DetailsPanel>
  );
}