/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { List } from 'immutable';

import { EntityTable } from 'cx-ui-components';

import { setSelectedEntityId } from '../../redux/modules/crudEndpoint';

import { getTableColumns } from './config';

function mapDispatchToProps(dispatch) {
  return {
    onRowClick: id => {
      dispatch(setSelectedEntityId(id));
    }
  };
}

function mapStateToProps(state) {
  const currentEntity = state.get('crudEndpoint').get('currentEntity');
  const allEntities =
    state.get('crudEndpoint').getIn(['data', currentEntity]) || List();

  return {
    pageTitle: 'Lists',
    pageHelpLink:
      'https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm',
    onSearchFilterChange: e => console.log(e.target.value),
    onCreateBtnClick: () => console.log('SDK new list goes hereeeee'),
    items: allEntities.toJS(),
    columns: getTableColumns(currentEntity)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityTable);
