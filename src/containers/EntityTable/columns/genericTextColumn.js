/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { camelCaseToRegularForm } from 'serenova-js-utils/strings';

export function constructGeneralTextColumn(string) {
  const normalizedString = camelCaseToRegularForm(string);
  return {
    id: string,
    Header: <span title={normalizedString}>{normalizedString}</span>,
    accessor: string,
    Cell: ({ row }) => <span title={row[string]}>{row[string]}</span>
  };
}
