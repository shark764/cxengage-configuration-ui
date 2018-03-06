/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { SidePanelActions } from 'cx-ui-components';

import {
  onFormButtonSubmit,
  deselectCurrentEntity,
  getSelectedEntity
} from '../../redux/modules/crudEndpoint';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      dispatch(onFormButtonSubmit());
    },
    onCancel: () => {
      dispatch(deselectCurrentEntity());
    }
  };
}

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);

  if (selectedEntity) {
    return {
      isSaving: selectedEntity.get('updating') === true
    };
  }
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelActions);
