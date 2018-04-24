/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

export default function(presenceState) {
  return {
    Header: 'Presence State',
    show: presenceState,
    id: 'presenceState',
    accessor: 'state'
  };
}
