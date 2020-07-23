import { connect } from 'react-redux';
import {
  selectBusinessHoursEntityVersions,
  selectRules,
  selectDrafts,
  isCreatingDraft,
  getSelectedBusinessHourV2Version,
  selectBusinessHoursV2Data
} from '../../../../redux/modules/entities/businessHoursV2/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission,
  userHasPermissions,
  getEntityParentTenantName
} from '../../../../redux/modules/entities/selectors';
import {
  setSelectedBusinessHourVersion,
  removeListItem,
  createDraftBusinessHoursV2,
  setSelectedSubEntityId
} from '../../../../redux/modules/entities';
import UpdateLayout from './layout';

export const mapStateToProps = state => ({
  businessHourId: getSelectedEntityId(state),
  versions: selectBusinessHoursEntityVersions(state),
  rules: selectRules(state),
  isSaving: isCreating(state),
  inherited: isInherited(state),
  userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL', 'VIEW_ALL_BUSINESS_HOURS']),
  userHasUpdatePermission: userHasUpdatePermission(state),
  userHasSharePermission: userHasSharePermission(state),
  drafts: (!(isInherited(state) || !userHasUpdatePermission(state)) && selectDrafts(state)) || [],
  isCreatingDraft: isCreatingDraft(state),
  selectedBusinessHourVersion: getSelectedBusinessHourV2Version(state),
  businessHoursList: selectBusinessHoursV2Data(state),
  parentTenantName: getEntityParentTenantName(state)
});

export const actions = {
  setSelectedBusinessHourVersion,
  removeListItem,
  createDraft: (businessHourId, values) => createDraftBusinessHoursV2(businessHourId, values),
  setSelectedSubEntityId: subEntityId => setSelectedSubEntityId(subEntityId)
};

export default connect(mapStateToProps, actions)(UpdateLayout);
