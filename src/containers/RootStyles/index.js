/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { RootStyles } from 'cx-ui-components';

import { fetchData } from '../../redux/modules/entities';

function mapDispatchToProps(dispatch) {
  return {
    fetchStyles: () => {
      dispatch(fetchData('branding'));
    },
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    theme: state.getIn(['Entities', 'branding', 'data'])
  };
}

const RootStylesContainer = connect(mapStateToProps, mapDispatchToProps)(
  RootStyles
);

export default RootStylesContainer;
