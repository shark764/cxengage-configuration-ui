/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { RootStyles } from 'cx-ui-components';

function mapStateToProps(state) {
  return {
    theme: state.getIn(['Entities', 'branding', 'data'])
  };
}

const RootStylesContainer = connect(mapStateToProps)(RootStyles);

export default RootStylesContainer;
