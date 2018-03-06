/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { SidePanelActions } from 'cx-ui-components';

import {
  onFormButtonSubmit,
  deselectCurrentEntity
} from '../../redux/modules/crudEndpoint';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      dispatch(onFormButtonSubmit());
    },
    onCancel: () => {
      dispatch(deselectCurrentEntity());
    }
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelActions);
