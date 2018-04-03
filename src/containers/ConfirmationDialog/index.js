/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { Confirmation } from 'cx-ui-components';

import * as MODALS from './constants.js';

import {
  executeConfirmCallback,
  setConfirmationDialog
} from '../../redux/modules/crudEndpoint';

import {
  getConfirmationDialogType,
  getSelectedEntity
} from '../../redux/modules/crudEndpoint/selectors';

function mapDispatchToProps(dispatch) {
  return {
    confirmBtnCallback: () => {
      dispatch(executeConfirmCallback());
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
  let confirmSubtext;
  const modalType = getConfirmationDialogType(state);

  if (modalType === MODALS.CONFIRM_ENTITY_ACTIVE_TOGGLE) {
    mainText = getSelectedEntity(state).get('active')
      ? 'Are you sure you want to disable this list?'
      : 'Are you sure you want to enable this list?';
  }

  return {
    confirmBtnText,
    cancelBtnText,
    mainText,
    confirmSubtext
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
