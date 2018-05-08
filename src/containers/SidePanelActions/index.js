/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { isPristine } from 'redux-form/immutable';
import { SidePanelActions } from 'cx-ui-components';

import {
  onFormButtonSubmit,
  unsetSelectedEntityId
} from '../../redux/modules/entities';
import {
  isCreating,
  getSelectedEntity,
  getSelectedEntityFormId
} from '../../redux/modules/entities/selectors';

export const actions = {
  onSubmit: onFormButtonSubmit,
  onCancel: unsetSelectedEntityId
};

export function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  const formId = getSelectedEntityFormId(state);

  return {
    isSaving:
      isCreating(state) ||
      (selectedEntity && selectedEntity.get('updating') === true),
    pristine: isPristine(formId)(state)
  };
}

export default connect(mapStateToProps, actions)(SidePanelActions);
