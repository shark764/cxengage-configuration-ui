/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { isPristine } from 'redux-form/immutable';
import { SidePanelActions } from 'cx-ui-components';

import {
  onFormButtonSubmit,
  deselectCurrentEntity,
  isCreating,
  getSelectedEntity,
  getSelectedEntityFormId
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
  const formId = getSelectedEntityFormId(state);

  return {
    isSaving:
      isCreating(state) ||
      (selectedEntity && selectedEntity.get('updating') === true),
    pristine: isPristine(formId)(state)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelActions);
