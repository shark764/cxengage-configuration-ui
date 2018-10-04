/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EntityTable } from 'cx-ui-components';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { setSelectedEntityCreate, setSelectedEntityId, toggleBulkEntityChange } from '../../redux/modules/entities';
import { getCurrentEntity, userHasCreatePermission } from '../../redux/modules/entities/selectors';
import { getHelpLink, getAllEntities } from './selectors';
import { getTableColumns } from './config';

export function mapStateToProps(state) {
  let entity = entitiesMetaData[getCurrentEntity(state)];
  return {
    pageTitle: entity ? entity.pageTitle : '',
    pageHelpLink: getHelpLink(state),
    items: getAllEntities(state),
    columns: getTableColumns(entity ? entity.entityName : undefined),
    userHasCreatePermission: userHasCreatePermission(state),
    entityMetadata: entity
  };
}

export const actions = {
  onCreateButtonClick: setSelectedEntityCreate,
  onRowClick: setSelectedEntityId,
  onBulkClick: toggleBulkEntityChange
};

export default connect(mapStateToProps, actions)(EntityTable);
