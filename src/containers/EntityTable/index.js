/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EntityTable } from 'cx-ui-components';

import { capitalizeFirstLetter } from '../../utils/string';

import { setSelectedEntityId } from '../../redux/modules/crudEndpoint';
import {
  getCurrentEntity,
  getAllEntities,
  userHasCreatePermission
} from '../../redux/modules/crudEndpoint/selectors';

import { getTableColumns } from './config';

function mapDispatchToProps(dispatch) {
  return {
    onCreateButtonClick: () => {
      dispatch(setSelectedEntityId('create'));
    },
    onRowClick: id => {
      dispatch(setSelectedEntityId(id));
    }
  };
}

function mapStateToProps(state) {
  const currentEntity = getCurrentEntity(state);
  return {
    pageTitle: capitalizeFirstLetter(currentEntity),
    pageHelpLink:
      'https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm',
    onSearchFilterChange: e => console.log(e.target.value),
    items: getAllEntities(state) ? getAllEntities(state).toJS() : undefined,
    columns: getTableColumns(currentEntity),
    userHasCreatePermission: userHasCreatePermission(state)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityTable);
