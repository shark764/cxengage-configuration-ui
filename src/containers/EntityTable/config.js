/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { nameColumn } from './columns/name';
import { statusColumn } from './columns/status';
import { listTypeColumn } from './columns/listType';
import { descriptionColumn } from './columns/description';

export const getHelpLink = entityName => {
  switch (entityName) {
    case 'lists':
      return 'docs.cxengage.net/Help/Content/Configuration/Lists/Lists.htm';
    case 'emailTemplates':
      return 'docs.cxengage.net/Help/Content/Configuration/Email_Templates/Email_Templates_Overview.htm';
    default:
      return undefined;
  }
};

export function getTableColumns(entityName) {
  switch (entityName) {
    case 'lists':
      return [nameColumn, listTypeColumn, statusColumn];
    case 'emailTemplates':
      return [nameColumn, descriptionColumn];
    default:
      return [];
  }
}
