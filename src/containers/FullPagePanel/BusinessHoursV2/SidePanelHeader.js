import { connect } from 'react-redux';
import { SidePanelHeader } from 'cx-ui-components';
import { toggleEntity } from '../../../redux/modules/entities';
import {
  userHasUpdatePermission,
  isInherited,
  shouldDisableHeaderToggleField,
  isBulkUpdating,
  getConfirmationToggleEntityMessage
} from '../../../redux/modules/entities/selectors';
import { isFormPristine, isFormDirty } from '../../../redux/modules/form/selectors';
import { panelHeaderBusinessHoursV2 as sidePanelHeader } from '../../../redux/modules/entities/businessHoursV2/selectors';
import { isInIframe } from 'serenova-js-utils/browser';

export function mapDispatchToProps(dispatch) {
  return {
    onToggle: () => dispatch(toggleEntity())
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
