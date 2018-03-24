/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { RootStyles } from 'cx-ui-components';

import { fetchBranding } from '../../redux/modules/branding';

function mapDispatchToProps(dispatch) {
  return {
    fetchStyles: () => {
      dispatch(fetchBranding());
    },
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    theme: state.getIn(['branding', 'styles'])
  };
}

const RootStylesContainer = connect(mapStateToProps, mapDispatchToProps)(
  RootStyles
);

export default RootStylesContainer;
