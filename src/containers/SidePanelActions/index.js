/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { SidePanelActions } from 'cx-ui-components';
import { isDisplayContentInHtml } from '../../redux/modules/entities/messageTemplates/selectors';

import { onFormButtonSubmit, unsetSelectedEntityId } from '../../redux/modules/entities';
import { isSaving } from '../../redux/modules/entities/selectors';

import { isFormInvalid, isFormPristine, isFormDirty } from '../../redux/modules/form/selectors';

export const actions = {
  onSubmit: onFormButtonSubmit,
  onCancel: unsetSelectedEntityId
};

export function mapStateToProps(state) {
  return {
    isSaving: isSaving(state),
    pristine: isFormPristine(state),
    dirty: isFormDirty(state),
    invalid: isFormInvalid(state) || isDisplayContentInHtml(state)
  };
}

export default connect(mapStateToProps, actions)(SidePanelActions);
