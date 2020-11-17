import { connect } from 'react-redux';
import { change } from 'redux-form';
import { isDirty } from 'redux-form/immutable';

import { setCurrentEntity, fetchData, updateUserProfile, setConfirmationDialog } from '../../../redux/modules/entities';
import {
  userHasUpdatePermission,
  userHasPermissions,
  getConfirmationDialogType,
  getNextEntity
} from '../../../redux/modules/entities/selectors';
import { getFormValues } from '../../../redux/modules/form/selectors';
import {
  selectUserTenants,
  isSaving,
  userProfileInitialValues
} from '../../../redux/modules/entities/userProfile/selectors';
import UserProfileLayout from './layout';

export const mapStateToProps = state => ({
  userHasUpdatePermission: userHasUpdatePermission(state),
  isSaving: isSaving(state),
  canUpdatePassword: userHasPermissions(state, ['PLATFORM_MANAGE_MY_PASSWORD']),
  canUpdateExtensions: userHasPermissions(state, ['MANAGE_USER_EXTENSIONS', 'MANAGE_MY_EXTENSIONS']),
  canManageAllExtensions: userHasPermissions(state, ['MANAGE_ALL_USER_EXTENSIONS']),
  tenantsList: selectUserTenants(state),
  extensionsValue: getFormValues(state, 'userProfile:extensions', 'extensions'),
  initialValues: userProfileInitialValues(state),
  isDetailsFormDirty: isDirty('userProfile:details')(state),
  isExtensionsFormDirty: isDirty('userProfile:extensions')(state),
  showConfirmationDialog: getConfirmationDialogType(state),
  nextEntity: getNextEntity(state)
});

export const mapDispatchToProps = dispatch => ({
  setCurrentEntity: entityName => dispatch(setCurrentEntity(entityName)),
  fetchData: entityName => dispatch(fetchData(entityName)),
  updateUserProfile: (profileEntity, values) => dispatch(updateUserProfile(profileEntity, values)),
  changeExtensions: extensions => dispatch(change('userProfile:extensions', 'extensions', extensions)),
  cancelCallback: () => dispatch(setConfirmationDialog(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileLayout);
