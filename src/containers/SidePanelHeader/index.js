/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { SidePanelHeader } from 'cx-ui-components';
import { unsetSelectedEntityId, copyCurrentEntity, toggleEntity } from '../../redux/modules/entities';
import {
  sidePanelHeader,
  userHasUpdatePermission,
  isInherited,
  shouldDisableHeaderToggleField,
  isBulkUpdating,
  getConfirmationToggleEntityMessage
} from '../../redux/modules/entities/selectors';
import { isFormPristine, isFormDirty } from '../../redux/modules/form/selectors';
import { updateConfigUIUrlWithQueryString } from '../../redux/modules/entities';
import { isInIframe } from 'serenova-js-utils/browser';

export function mapDispatchToProps(dispatch) {
  let actions = {};
  // TODO: copy button is experimental feature and is feature flagged.
  if (location.hash.includes('alpha')) {
    actions.copy = () => dispatch(copyCurrentEntity());
  }
  return {
    ...actions,
    onClose: () => dispatch(unsetSelectedEntityId()),
    onToggle: () => dispatch(toggleEntity()),
    updateConfigUIUrlWithQueryString: entityId => dispatch(updateConfigUIUrlWithQueryString(entityId))
  };
}

export function mapStateToProps(state) {
  return {
    title: sidePanelHeader(state).title,
    createdAt: sidePanelHeader(state).createdAt,
    updatedAt: sidePanelHeader(state).updatedAt,
    toggleStatus: sidePanelHeader(state).toggleStatus,
    userHasUpdatePermission: userHasUpdatePermission(state),
    inherited: isInherited(state),
    disabled: shouldDisableHeaderToggleField(state),
    isBulkUpdating: isBulkUpdating(state),
    pristine: isFormPristine(state),
    dirty: isFormDirty(state),
    confirmationMessage: getConfirmationToggleEntityMessage(state),
    insideIframe: !isInIframe()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelHeader);
