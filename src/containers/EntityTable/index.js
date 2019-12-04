/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EntityTable } from 'cx-ui-components';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';
import {
  setSelectedEntityCreate,
  setSelectedEntityId,
  toggleBulkEntityChange,
  updateConfigUIUrlWithQueryString
} from '../../redux/modules/entities';
import {
  getCurrentEntity,
  userHasCreatePermission,
  userHasUpdatePermission,
  isEntityFetching
} from '../../redux/modules/entities/selectors';
import { selectVisibleSubMenu, selectTableColumns } from '../../redux/modules/columnFilterMenus/selectors';

import { setVisibleMenu } from '../../redux/modules/columnFilterMenus';
import { getHelpLink, getAllEntitiesTableData } from './selectors';
import { getTableColumns } from './config';
import { isInIframe } from 'serenova-js-utils/browser';
import { isFormDirty, isFormPristine } from '../../redux/modules/form/selectors';

export function mapStateToProps(state, props) {
  const entity = entitiesMetaData[getCurrentEntity(state)] || {};
  const {
    entityName = 'none',
    pageTitle = '',
    defaultFilters = [],
    defaultSorted = [],
    bulkEditsAvailable = false
  } = entity;
  return {
    pageTitle,
    pageHelpLink: getHelpLink(state),
    items: getAllEntitiesTableData(state),
    columns: getTableColumns(selectTableColumns(state, entityName)),
    userHasCreatePermission: userHasCreatePermission(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    entityMetadata: entity,
    currentVisibleSubMenu: selectVisibleSubMenu(state, props),
    filtered: defaultFilters,
    sorted: defaultSorted,
    fetching: isEntityFetching(state),
    showBulkActionsMenu: bulkEditsAvailable,
    insideIframe: !isInIframe(),
    pristine: isFormPristine(state),
    dirty: isFormDirty(state)
  };
}

export const actions = {
  onCreateButtonClick: setSelectedEntityCreate,
  onRowClick: setSelectedEntityId,
  onBulkClick: toggleBulkEntityChange,
  setVisibleMenu,
  updateConfigUIUrlWithQueryString
};

export default connect(mapStateToProps, actions)(EntityTable);
