/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from './columns/name';
import { statusColumn } from './columns/status';
import { listTypeColumn } from './columns/listType';
import { descriptionColumn } from './columns/description';
import { metricTypeColumn } from './columns/metricType';

/**
 * Returns table columns for current entity
 */
export function getTableColumns(entityName) {
  switch (entityName) {
    case 'lists':
      return [nameColumn, listTypeColumn, statusColumn];
    case 'emailTemplates':
      return [nameColumn, descriptionColumn];
    case 'outboundIdentifiers':
      return [nameColumn, descriptionColumn];
    case 'outboundIdentifierLists':
      return [nameColumn, descriptionColumn];
    case 'customMetrics':
      return [metricTypeColumn, nameColumn, descriptionColumn, statusColumn];
    case 'chatWidgets':
      return [nameColumn, descriptionColumn, statusColumn];
    //hygen-inject-before
    default:
      return [];
  }
}
