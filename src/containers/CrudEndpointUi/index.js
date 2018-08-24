/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

// Actions
import {
  setCurrentEntity,
  fetchData,
  setSelectedSubEntityId
} from '../../redux/modules/entities';

// Selectors
import {
  getSelectedEntityId,
  getSelectedSubEntityId,
  getConfirmationDialogType
} from '../../redux/modules/entities/selectors';

import Layout from './Layout';

function mapStateToProps(state) {
  return {
    selectedEntityId: getSelectedEntityId(state),
    selectedSubEntityId: getSelectedSubEntityId(state),
    showConfirmationDialog: getConfirmationDialogType(state)
  };
}

export const actions = {
  setCurrentEntity,
  fetchData,
  setSelectedSubEntityId: setSelectedSubEntityId(undefined)
};

const CrudEndpointUi = connect(mapStateToProps, actions)(Layout);

export default CrudEndpointUi;
