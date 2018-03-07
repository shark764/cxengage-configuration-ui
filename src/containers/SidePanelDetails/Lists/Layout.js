/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import ListsDetailsPanel from './index';
import UpdateListForm from '../../Form/Lists/Update';

export default function ListsLayout(props) {
  return (
    <ListsDetailsPanel>
      <UpdateListForm />
    </ListsDetailsPanel>
  );
}
