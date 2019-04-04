/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

// Actions
import { setCurrentEntity, fetchData, setSelectedSubEntityId, setSelectedEntityId } from '../../redux/modules/entities';

// Selectors
import {
  getSelectedEntityId,
  getSelectedSubEntityId,
  getConfirmationDialogType,
  getCurrentEntity,
  getSelectedEntityBulkChangeItems,
  getSidePanelWidth,
} from '../../redux/modules/entities/selectors';
import { selectVisibleSubMenu } from '../../redux/modules/columnFilterMenus/selectors';
import { currentTenantId } from '../../redux/modules/userData/selectors';

import Layout from './layout';

function mapStateToProps(state, props) {
  return {
    selectedEntityId: getSelectedEntityId(state),
    selectedSubEntityId: getSelectedSubEntityId(state),
    showConfirmationDialog: getConfirmationDialogType(state),
    currentVisibleSubMenu: selectVisibleSubMenu(state, props),
    tableType: getCurrentEntity(state),
    bulkSelectedTotal: getSelectedEntityBulkChangeItems(state),
    slidingWidth: getSidePanelWidth(state),
    currentTenantId: currentTenantId(state),
  };
}

export const actions = {
  setCurrentEntity,
  fetchData,
  setSelectedSubEntityId: setSelectedSubEntityId(undefined),
  setSelectedEntityId,
};

export default connect(mapStateToProps, actions)(Layout);