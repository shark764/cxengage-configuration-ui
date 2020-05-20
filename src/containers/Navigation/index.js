import { connect } from 'react-redux';
import NavigationLayout from './layout';
import { setCurrentEntity, setSelectedEntityId, setConfirmationDialog } from '../../redux/modules/entities';

import {
  authenticatedAndBrandingReady,
  getAvailableTenants,
  currentTenantId,
  getCurrentTenantName
} from '../../redux/modules/userData/selectors';
import { switchTenant } from '../../redux/modules/userData';
import { getCustomTheme } from '../../redux/modules/entities/branding/selectors';
import { isFormDirty, areSubEntityFormsDirty } from '../../redux/modules/form/selectors';

export function mapStateToProps(state, props) {
  return {
    authenticatedAndBrandingReady: authenticatedAndBrandingReady(state),
    tenants: getAvailableTenants(state),
    currentTenantId: currentTenantId(state),
    currentTenantName: getCurrentTenantName(state),
    theme: getCustomTheme(state),
    isCurrentFormDirty: isFormDirty(state),
    areSubEntityFormsDirty: areSubEntityFormsDirty(state)
  };
}

export const actions = {
  switchTenant,
  setCurrentEntity,
  setSelectedEntityId,
  setConfirmationDialog
};

export default connect(mapStateToProps, actions)(NavigationLayout);
