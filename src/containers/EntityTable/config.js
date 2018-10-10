/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from './columns/name';
import { statusColumn } from './columns/status';
import { listTypeColumn } from './columns/listType';
import { descriptionColumn } from './columns/description';
import { permissionsColumn } from './columns/permissions';
import { metricTypeColumn } from './columns/metricType';
import { constructGeneralTextColumn } from './columns/genericTextColum';

export function getTableColumns(columns) {
  /**
   * Maps the name of a column provided by redux to its designated component
   * The name doesn't match the component id as we also use the name directly in the columns menu
   * @param {array} columns is an array of predefined columns from redux fetched from a selector
   */
  const columnMap = {
    'Name': nameColumn,
    'Description': descriptionColumn,
    'Status': statusColumn,
    'List Type': listTypeColumn,
    'Permissions': permissionsColumn,
    'Metric Type': metricTypeColumn,
    'Value': constructGeneralTextColumn('value'),
    'channelType': constructGeneralTextColumn('channelType'),
    'flowId': constructGeneralTextColumn('flowId'),
  }
  let result = [];
  columns.forEach(x => x.active && result.push(columnMap[x.name]))
  return result;
}
