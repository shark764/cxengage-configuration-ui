/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import SkillsDetailsPanel from './layout';
import {
  userHasUpdatePermission,
  getSelectedEntity,
  getCurrentEntity
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity } from '../../../redux/modules/entities';
import { getDependantEntityTableItems, getListSize } from '../../../redux/modules/entities/listItemSelectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state, props) {
  const currentEntity = getCurrentEntity(state);
  return {
    item: getSelectedEntity(state).toJS(),
    userHasUpdatePermission: userHasUpdatePermission(state),
    tableItems: getDependantEntityTableItems(state),
    tableFields: entitiesMetaData[currentEntity].sidePanelListTableFields,
    listSize: getListSize(state)
  };
}

export const actions = {
  removeListItem: toggleListItemEntity,
  setSelectedSubEntityId
};

export default connect(mapStateToProps, actions)(SkillsDetailsPanel);
