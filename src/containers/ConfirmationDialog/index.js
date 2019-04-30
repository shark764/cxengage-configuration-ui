/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { Confirmation } from 'cx-ui-components';

import * as MODALS from './constants.js';

import { executeConfirmCallback, setConfirmationDialog } from '../../redux/modules/entities';
import { getConfirmationDialogType, getSelectedEntity, getCurrentEntity } from '../../redux/modules/entities/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

function mapDispatchToProps(dispatch) {
  return {
    confirmBtnCallback: metaData => {
      dispatch(executeConfirmCallback(metaData));
    },
    cancelBtnCallback: () => {
      dispatch(setConfirmationDialog(undefined));
    },
    dispatch
  };
}

function mapStateToProps(state) {
  let mainText;
  let confirmBtnText;
  let cancelBtnText;
  let confirmationMessage;
  const modalType = getConfirmationDialogType(state);
  const currentEntity = entitiesMetaData[getCurrentEntity(state)].title;
  if (currentEntity === 'Role') {
    confirmationMessage = `If you disable this role it will become unavailable for this tenant and all child tenants it is shared with and any users with this role assigned to them may lose permissions granted by this role and may lose the ability to access the platform or specific features granted by this role. Do you want to continue?`;
  } else if (currentEntity === 'SLA') {
    confirmationMessage = `This will disable the SLA, but will not remove its association with queue or tenant default settings. Associated queues or tenant settings will continue to use this SLA until they are updated. Do you want to continue?`;
  } else {
    confirmationMessage = `This will disable this ${currentEntity}. Do you want to continue?`;
  }
  switch (modalType) {
    case MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE:
      mainText =
        getSelectedEntity(state).get('active') || getSelectedEntity(state).get('status') === 'accepted'
          ? confirmationMessage
          : `This will enable this ${currentEntity}. Do you want to continue?`;
      break;
    case MODALS.CONFIRM_ENTITY_CSV_UPLOAD:
      mainText = `Are you sure you want to override this ${currentEntity}?`;
      break;
    default:
  }

  return {
    confirmBtnText,
    cancelBtnText,
    mainText
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
