/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { Confirmation } from 'cx-ui-components';

import * as MODALS from './constants.js';

import { removeLastLetter } from '../../utils/string';

import {
  executeConfirmCallback,
  setConfirmationDialog
} from '../../redux/modules/crudEndpoint';

import {
  getConfirmationDialogType,
  getSelectedEntity,
  getCurrentEntity
} from '../../redux/modules/crudEndpoint/selectors';

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

  const modalType = getConfirmationDialogType(state);
  const currentEntity = removeLastLetter(getCurrentEntity(state));

  switch (modalType) {
    case MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE:
      mainText = getSelectedEntity(state).get('active')
        ? `This will disable this ${currentEntity}. Do you want to continue?`
        : `This will enable this ${currentEntity}. Do you want to continue?`;
      break;
    case MODALS.CONFIRM_ENTITY_CSV_UPLOAD:
      mainText = `Are you sure you want to override this ${removeLastLetter(
        getCurrentEntity(state)
      )}?`;
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
