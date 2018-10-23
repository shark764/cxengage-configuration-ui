/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from './columns/name';
import { statusColumn } from './columns/status';
import { listTypeColumn } from './columns/listType';
import { descriptionColumn } from './columns/description';
import { permissionsColumn } from './columns/permissions';
import { metricTypeColumn } from './columns/metricType';
import { constructGeneralTextColumn } from './columns/genericTextColumn';
import { constructGeneralBooleanColumn } from './columns/genericBooleanColumn';

export function getTableColumns(columns) {
  /**
   * Maps the name of a column provided by redux to its designated component
   * The name doesn't match the component id as we also use the name directly in the columns menu
   * @param {array} columns is an array of predefined columns from redux fetched from a selector
   */
  const columnMap = {
    Name: nameColumn,
    'First Name': constructGeneralTextColumn('firstName'),
    'Last Name': constructGeneralTextColumn('lastName'),
    Role: constructGeneralTextColumn('roleName'),
    Email: constructGeneralTextColumn('email'),
    Presence: constructGeneralTextColumn('state'),
    // TODO: Skills and Groups require a special column to work
    // 'Skills': constructGeneralTextColumn('skills'),
    // 'Groups': constructGeneralTextColumn('groups'),
    'Platform Status': constructGeneralTextColumn('platformStatus'),
    'External Id': constructGeneralTextColumn('externalId'),
    'Invitation Status': constructGeneralTextColumn('invitationStatus'),
    Description: descriptionColumn,
    Status: statusColumn,
    'List Type': listTypeColumn,
    Permissions: permissionsColumn,
    'Metric Type': metricTypeColumn,
    Value: constructGeneralTextColumn('value'),
    channelType: constructGeneralTextColumn('channelType'),
    flowId: constructGeneralTextColumn('flowId'),
    Proficiency: constructGeneralBooleanColumn('hasProficiency')
  };
  let result = [];
  columns.forEach(x => x.active && result.push(columnMap[x.name]));
  return result;
}
