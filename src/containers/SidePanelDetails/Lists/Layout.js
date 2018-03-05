/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import ListsDetailsPanel from './index';
import ListsForm from '../../Form/Lists';

export default function ListsLayout(props) {
  return (
    <ListsDetailsPanel>
      <ListsForm />
    </ListsDetailsPanel>
  );
}
