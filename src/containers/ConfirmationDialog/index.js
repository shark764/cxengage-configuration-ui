/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { Confirmation } from 'cx-ui-components';

import * as MODALS from './constants.js';

import { executeConfirmCallback, setConfirmationDialog } from '../../redux/modules/entities';
import { getConfirmationDialogType, getCurrentEntity } from '../../redux/modules/entities/selectors';
import { entitiesMetaData } from '../../redux/modules/entities/metaData';

function mapDispatchToProps(dispatch) {
  return {
    confirmBtnCallback: metaData => {
      dispatch(executeConfirmCallback(metaData));
    },
    cancelBtnCallback: () => {
      dispatch(setConfirmationDialog(undefined));
    }
  };
}

function mapStateToProps(state) {
  let mainText;
  let secondaryText;
  let confirmBtnText;
  let cancelBtnText;
  const modalType = getConfirmationDialogType(state);
  const currentEntity = entitiesMetaData[getCurrentEntity(state)].title;

  switch (modalType) {
    case MODALS.CONFIRM_ENTITY_CSV_UPLOAD:
      mainText = `Are you sure you want to override this ${currentEntity}?`;
      break;
    case MODALS.CONFIRM_SET_ENTITY_WHEN_FORM_IS_DIRTY:
      mainText = 'You have unsaved changes that will be lost!.';
      secondaryText = 'Click Confirm to discard changes, or Cancel to continue editing.';
      break;
    default:
  }

  return {
    confirmBtnText,
    cancelBtnText,
    mainText,
    secondaryText
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
