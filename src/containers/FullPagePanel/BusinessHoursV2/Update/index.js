import { connect } from 'react-redux';
import {
  selectBusinessHoursEntityVersions,
  selectRules,
  selectDrafts,
  isCreatingDraft,
  getSelectedBusinessHourV2Version
} from '../../../../redux/modules/entities/businessHoursV2/selectors';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission,
  userHasPermissions
} from '../../../../redux/modules/entities/selectors';
import {
  setSelectedBusinessHourVersion,
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
  userHasViewPermission: userHasPermissions(state, ['PLATFORM_VIEW_ALL']),
  userHasUpdatePermission: userHasUpdatePermission(state),
  userHasSharePermission: userHasSharePermission(state),
  drafts: selectDrafts(state),
  isCreatingDraft: isCreatingDraft(state),
  selectedBusinessHourVersion: getSelectedBusinessHourV2Version(state)
});

export const actions = {
  setSelectedBusinessHourVersion,
  createDraft: (values, businessHourId) => createDraftBusinessHoursV2(values, businessHourId),
  setSelectedSubEntityId: subEntityId => setSelectedSubEntityId(subEntityId)
};

export default connect(mapStateToProps, actions)(UpdateLayout);
