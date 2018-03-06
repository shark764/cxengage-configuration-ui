/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { setCurrentEntity, fetchData } from '../../redux/modules/crudEndpoint';

import Layout from './Layout';

function mapDispatchToProps(dispatch) {
  return {
    setCurrentEntity: entityName => {
      dispatch(setCurrentEntity(entityName));
    },
    fetchData: entityName => {
      dispatch(fetchData(entityName));
    },
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    selectedEntityId: state.getIn(['crudEndpoint', 'selectedEntityId'])
  };
}

const CrudEndpointUi = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default CrudEndpointUi;