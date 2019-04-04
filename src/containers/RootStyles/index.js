/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { RootStyles } from 'cx-ui-components';

import { getCustomTheme } from '../../redux/modules/entities/branding/selectors';

function mapStateToProps(state) {
  return {
    theme: getCustomTheme(state)
  };
}

export default connect(mapStateToProps)(RootStyles);
