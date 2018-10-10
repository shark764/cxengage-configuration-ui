/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EntityTable } from 'cx-ui-components';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import { setSelectedEntityCreate, setSelectedEntityId, toggleBulkEntityChange } from '../../redux/modules/entities';
import { getCurrentEntity, userHasCreatePermission, userHasUpdatePermission } from '../../redux/modules/entities/selectors';
import { selectVisibleSubMenu, selectTableColumns } from '../../redux/modules/columnFilterMenus/selectors';
import { setVisibleMenu } from '../../redux/modules/columnFilterMenus';
import { getHelpLink, getAllEntities } from './selectors';
import { getTableColumns } from './config';

export function mapStateToProps(state, props) {
  let entity = entitiesMetaData[getCurrentEntity(state)];
  let entityName = entity ? entity.entityName : 'none';
  return {
    pageTitle: entity ? entity.pageTitle : '',
    pageHelpLink: getHelpLink(state),
    items: getAllEntities(state),
    columns: getTableColumns(selectTableColumns(state, entityName)),
    userHasCreatePermission: userHasCreatePermission(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    entityMetadata: entity,
    currentVisibleSubMenu: selectVisibleSubMenu(state, props),
  };
}

export const actions = {
  onCreateButtonClick: setSelectedEntityCreate,
  onRowClick: setSelectedEntityId,
  onBulkClick: toggleBulkEntityChange,
  setVisibleMenu
};

export default connect(mapStateToProps, actions)(EntityTable);
