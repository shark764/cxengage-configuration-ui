import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectColumnsMenuColumns, areAllActive } from './selectors';
import {
  toggleAllColumnsOn,
  toggleAllColumnsOff,
  toggleColumn,
  toggleAllInverseColumns
} from './actions';

import CheckboxMenu from '../../components/checkboxMenu.js';

class ColumnsMenu extends React.Component {
  render() {
    return (
      <CheckboxMenu
        items={this.props.columns}
        buttonText="Columns"
        style={this.props.style}
        toggleAllOn={this.props.toggleAllColumnsOn}
        toggleAllOff={this.props.toggleAllColumnsOff}
        toggleItem={this.props.toggleColumn}
        toggleAllInverse={this.props.toggleAllInverseColumns}
        allActive={this.props.allActive}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  columns: selectColumnsMenuColumns(state, props),
  allActive: areAllActive(state, props)
});

function mapDispatchToProps(dispatch) {
  return {
    toggleColumn: columnName => dispatch(toggleColumn(columnName)),
    toggleAllColumnsOn: () => dispatch(toggleAllColumnsOn()),
    toggleAllColumnsOff: () => dispatch(toggleAllColumnsOff()),
    toggleAllInverseColumns: () => dispatch(toggleAllInverseColumns()),
    dispatch
  };
}

ColumnsMenu.propTypes = {
  columns: PropTypes.object.isRequired,
  allActive: PropTypes.bool.isRequired,
  toggleColumn: PropTypes.func.isRequired,
  toggleAllColumnsOn: PropTypes.func.isRequired,
  toggleAllColumnsOff: PropTypes.func.isRequired,
  toggleAllInverseColumns: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnsMenu);
