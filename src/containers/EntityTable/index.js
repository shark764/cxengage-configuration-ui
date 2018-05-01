/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EntityTable } from 'cx-ui-components';

import { camelCaseToRegularForm } from '../../utils/string';

import {
  setSelectedEntityCreate,
  setSelectedEntityId
} from '../../redux/modules/entities';
import {
  getCurrentEntity,
  userHasCreatePermission
} from '../../redux/modules/entities/selectors';
import { getHelpLink, getAllEntities } from './selectors';
import { getTableColumns } from './config';

export function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);
  return {
    pageTitle: camelCaseToRegularForm(currentEntity),
    pageHelpLink: getHelpLink(state),
    items: getAllEntities(state),
    columns: getTableColumns(currentEntity),
    userHasCreatePermission: userHasCreatePermission(state)
  };
}

export const actions = {
  onCreateButtonClick: setSelectedEntityCreate,
  onRowClick: setSelectedEntityId
};

export default connect(mapStateToProps, actions)(EntityTable);
