import { connect } from 'react-redux';
import NavigationLayout from './layout';

import {
  authenticatedAndBrandingReady,
  getAvailableTenants,
  currentTenantId,
  getCurrentTenantName
} from '../../redux/modules/userData/selectors';
import { switchTenant } from '../../redux/modules/userData';
import { getCustomTheme } from '../../redux/modules/entities/branding/selectors';

export function mapStateToProps(state, props) {
  return {
    authenticatedAndBrandingReady: authenticatedAndBrandingReady(state),
    tenants: getAvailableTenants(state),
    currentTenantId: currentTenantId(state),
    currentTenantName: getCurrentTenantName(state),
    theme: getCustomTheme(state)
  };
}

export const actions = {
  switchTenant
};

export default connect(mapStateToProps, actions)(NavigationLayout);
