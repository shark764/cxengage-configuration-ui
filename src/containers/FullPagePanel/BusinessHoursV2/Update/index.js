import { connect } from 'react-redux';
import {
  selectBusinessHoursEntityVersions,
  getBusinessHourActiveVersion
} from '../../../../redux/modules/entities/businessHoursV2/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission,
  userHasPermissions,
  isEntityFetching,
  itemApiPending
} from '../../../../redux/modules/entities/selectors';
import {
  selectBusinessHoursV2FormInitialValues,
  selectBusinessHoursRules
} from '../../../../redux/modules/entities/businessHoursV2/selectors';
import { getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import { setSelectedBusinessHourVersion } from '../../../../redux/modules/entities';
import UpdateLayout from './layout';

export const mapStateToProps = state => ({
  initialValues: selectBusinessHoursV2FormInitialValues(state),
  key: getSelectedEntityId(state),
  versions: selectBusinessHoursEntityVersions(state),
  activeVersion: getBusinessHourActiveVersion(state),
  rules: selectBusinessHoursRules(state),
  isSaving: isCreating(state),
  inherited: isInherited(state),
  userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
  userHasUpdatePermission: userHasUpdatePermission(state),
  userHasSharePermission: userHasSharePermission(state),
  sharedFormValue: getCurrentFormValueByFieldName(state, 'shared'),
  versionsFetching: isEntityFetching(state, 'versions'),
  itemApiPending: itemApiPending(state)
});

export const actions = {
  setSelectedBusinessHourVersion
};

export default connect(mapStateToProps, actions)(UpdateLayout);
