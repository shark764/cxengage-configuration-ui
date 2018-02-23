import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

import { selectGroups, selectSkills } from '../ColumnsMenu/selectors';
import {
  toggleAllColumnsOn,
  toggleAllColumnsOff,
  toggleColumn,
  toggleAllInverseColumns
} from '../ColumnsMenu/actions';

import CheckboxMenu from '../../components/checkboxMenu.js';

class GroupsMenu extends React.Component {
  render() {
    return (
      <CheckboxMenu
        items={this.props.groups}
        buttonText="Groups"
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
  groups: selectGroups(state, props),
  skills: selectSkills(state, props)
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

// GroupsMenu.propTypes = {
//   columns: PropTypes.object.isRequired,
//   allActive: PropTypes.bool.isRequired,
//   toggleColumn: PropTypes.func.isRequired,
//   toggleAllColumnsOn: PropTypes.func.isRequired,
//   toggleAllColumnsOff: PropTypes.func.isRequired,
//   toggleAllInverseColumns: PropTypes.func.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsMenu);
