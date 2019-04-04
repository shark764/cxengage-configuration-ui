import { connect } from 'react-redux';
import NavigationLayout from './layout';

import { authenticatedAndBrandingReady, availableTenants, currentTenantId } from '../../redux/modules/userData/selectors';
import { switchTenant } from '../../redux/modules/userData';
import { getProtectedBranding } from '../../redux/modules/entities/branding/selectors';

export function mapStateToProps(state, props) {
  return {
    authenticatedAndBrandingReady: authenticatedAndBrandingReady(state),
    tenants: availableTenants(state),
    currentTenantId: currentTenantId(state),
    branding: getProtectedBranding(state),
  };
}

export const actions = {
  switchTenant
}

export default connect(mapStateToProps, actions)(NavigationLayout);
