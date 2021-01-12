/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from './columns/name';
import { statusColumn } from './columns/status';
import { listTypeColumn } from './columns/listType';
import { permissionsColumn } from './columns/permissions';
import { reportTypeColumn } from './columns/reportType';
import { constructGeneralTextColumn } from './columns/genericTextColumn';
import { constructGeneralBooleanColumn } from './columns/genericBooleanColumn';
import { tenantStatusColumn } from './columns/tenantStatus';
import { platformStatusColumn } from './columns/platformStatus';
import { activeQueueColumn } from './columns/activeQueue';
import { activeFlowColumn } from './columns/activeFlow';
import { flowColumn } from './columns/flow';
import { activeSlaColumn } from './columns/activeSla';
import { timezoneColumn } from './columns/timezone';
import { parentTenantColumn } from './columns/parentTenant';
import { roleNameColumn } from './columns/roleName';
import { presenceStateColumn } from './columns/presenceState';
import { activeBusinessHourColumn } from './columns/activeBusinessHour';
import { timezoneColumn2 } from './columns/timezone2';
import { sharedColumn2 } from './columns/shared2';
import { skillColumn } from './columns/skill';
import { groupColumn } from './columns/group';
import { labelColumn } from './columns/label';
import { capacityRuleActiveVersionColumn } from './columns/capacityRuleActiveVersion';
import { disconnectMinutesColumn } from './columns/disconnectMinutes';

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
    Role: roleNameColumn,
    Email: constructGeneralTextColumn('email'),
    Presence: presenceStateColumn,
    Skills: skillColumn,
    Groups: groupColumn,
    'External Id': constructGeneralTextColumn('externalId'),
    Description: constructGeneralTextColumn('description'),
    Status: statusColumn,
    'List Type': listTypeColumn,
    Permissions: permissionsColumn,
    Value: constructGeneralTextColumn('value'),
    channelType: constructGeneralTextColumn('channelType'),
    'Channel Type': constructGeneralTextColumn('channelType'),
    flowId: constructGeneralTextColumn('flowId'),
    Proficiency: constructGeneralTextColumn('proficiency'),
    'Has Proficiency': constructGeneralBooleanColumn('hasProficiency'),
    'Report Type': reportTypeColumn,
    'Platform Status': platformStatusColumn,
    'Tenant Status': tenantStatusColumn,
    Shared: constructGeneralBooleanColumn('shared'),
    'Is Default': constructGeneralBooleanColumn('isDefault'),
    'Active Queue': activeQueueColumn,
    'Active Flow': activeFlowColumn,
    'Interaction Field': constructGeneralTextColumn('interactionField'),
    Flow: flowColumn,
    'Active Sla': activeSlaColumn,
    Timezone: timezoneColumn,
    Type: constructGeneralTextColumn('type'),
    Channels: constructGeneralTextColumn('channels'),
    Identifier: constructGeneralTextColumn('id'),
    'Parent Tenant': parentTenantColumn,
    'Active Business Hour': activeBusinessHourColumn,
    Timezone2: timezoneColumn2,
    Shared2: sharedColumn2,
    'Attribute Identifier': constructGeneralTextColumn('identifier', 'attributeIdentifier'),
    'Realtime Reporting': constructGeneralTextColumn('realtime', 'realtimeReporting'),
    'Historical Reporting': constructGeneralTextColumn('historical', 'historicalReporting'),
    Attribute: constructGeneralTextColumn('objectName', 'attribute'),
    Label: labelColumn,
    Default: constructGeneralTextColumn('default'),
    Mandatory: constructGeneralBooleanColumn('mandatory'),
    activeVersionCapacityRule: capacityRuleActiveVersionColumn,
    'Disconnect Minutes': disconnectMinutesColumn,
  };
  let result = [];
  columns.forEach((x) => x.active && result.push(columnMap[x.name]));
  return result;
}
