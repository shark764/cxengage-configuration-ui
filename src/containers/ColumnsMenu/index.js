import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import styled from 'styled-components';

import { selectColumnsMenuColumns, areAllActive } from './selectors';
import {
  toggleAllColumnsOn,
  toggleAllColumnsOff,
  toggleColumn,
  toggleAllInverseColumns
} from './actions';

import { Button } from 'cx-ui-components';

const SubMenu = styled.div`
  position: absolute;
  background: white;
  padding: 2px;
  right: -9px;
  top: 37px;
  z-index: 3;
  width: 188px;
  box-shadow: 0px 0px 2px 0px rgba(42, 45, 41, 0.63);
`;
const SubMenuTopArrow = styled.div`
  border-width: 9px;
  border-style: solid;
  border-color: #fff transparent transparent #fff;
  border-image: initial;
  transform: rotate(45deg);
  border-radius: 3px;
  box-shadow: -2px -2px 2px -2px rgba(42, 45, 41, 0.63);
  width: 0px;
  height: 0px;
  z-index: 4;
  position: relative;
  right: -85px;
  top: -1px;
`;

const ColumnList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`;
const ListItem = styled.li`
  width: 80%;
  margin: 4px auto;
  color: #474747;
`;
const AllSelector = styled.span`
  float: right;
  color: #474747;
`;
const Seperator = styled.div`
  margin: 10px auto;
  width: 80%;
  border-bottom: 1px solid lightgrey;
`;

class ColumnsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      columns: props.columns,
      allActive: false
    };
  }

  hotKeys = e => {
    if (e.altKey) {
      // 73 is i key on keyboard
      if (e.which === 73) {
        this.props.toggleAllInverseColumns();
      }
      if (e.which === 65) {
        this.props.allActive
          ? this.props.toggleAllColumnsOff()
          : this.props.toggleAllColumnsOn();
      }
    }
  };

  componentWillMount() {
    // this.checkAllActive();
    document.addEventListener('keydown', this.hotKeys);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.hotKeys);
  }

  toggleAllActive = () => {
    let currentColumns = this.state.columns;
    currentColumns.forEach(col => (col.active = !this.state.allActive));
    this.setState({
      columns: currentColumns,
      allActive: !this.state.allActive
    });
  };
  invertActive = () => {
    let currentColumns = this.state.columns;
    currentColumns.forEach(col => (col.active = !col.active));
    this.setState({ columns: currentColumns });
    // if(this.state.allActive){
    //     this.setState({allActive: !this.state.allActive});
    // }
    this.checkAllActive();
  };
  // checkAllActive = () => {
  //   let active = true;
  //   this.state.columns.forEach(col => (!col.active ? (active = false) : null));
  //   this.setState({ allActive: active });
  // };
  toggleThisColumn = e => {
    let currentColumns = this.state.columns;
    currentColumns.forEach(col => {
      if (col.name === e.target.value) {
        col.active = !col.active;
      }
    });
    this.setState({ columns: currentColumns });
    this.checkAllActive();
  };

  render() {
    return (
      <div style={this.props.style}>
        <Button
          type="secondary"
          inner="Columns | "
          open={this.state.showSubMenu}
          onClick={() =>
            this.setState({ showSubMenu: !this.state.showSubMenu })
          }
        />

        {this.state.showSubMenu && [
          <SubMenuTopArrow key="SubMenuTopArrow" />,
          <SubMenu key="SubMenu">
            <ColumnList>
              <ListItem>
                <input
                  type="checkbox"
                  checked={this.props.allActive}
                  onChange={() => {
                    this.props.allActive
                      ? this.props.toggleAllColumnsOff()
                      : this.props.toggleAllColumnsOn();
                  }}
                />
                <AllSelector>All</AllSelector>
              </ListItem>
              <Seperator />
              {this.props.columns.map((col, i) => (
                <ListItem key={col.get('name')}>
                  <input
                    type="checkbox"
                    onChange={() => this.props.toggleColumn(col.get('name'))}
                    value={col.get('name')}
                    checked={col.get('active')}
                    key={i}
                  />
                  <span key={`listItemName${i}`} style={{ float: 'right' }}>
                    {col.get('name')}
                  </span>
                </ListItem>
              ))}
            </ColumnList>
          </SubMenu>
        ]}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnsMenu);
