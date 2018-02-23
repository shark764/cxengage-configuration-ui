import React from 'react';
// import PropTypes from "prop-types";
import styled from 'styled-components';

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

const ItemList = styled.ul`
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

class CheckboxMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      allActive: false
    };
  }

  hotKeys = e => {
    if (e.altKey) {
      // 73 is i key
      if (e.which === 73) {
        this.props.toggleAllInverse();
      }
      // 65 is a key
      if (e.which === 65) {
        this.props.allActive
          ? this.props.toggleAllOff()
          : this.props.toggleAllOn();
      }
    }
  };

  componentWillMount() {
    document.addEventListener('keydown', this.hotKeys);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.hotKeys);
  }

  render() {
    return (
      <div style={this.props.style}>
        <Button
          type="secondary"
          inner={`${this.props.buttonText} |`}
          open={this.state.showSubMenu}
          onClick={() =>
            this.setState({ showSubMenu: !this.state.showSubMenu })
          }
        />

        {this.state.showSubMenu && [
          <SubMenuTopArrow key="SubMenuTopArrow" />,
          <SubMenu key="SubMenu">
            <ItemList>
              <ListItem>
                <input
                  type="checkbox"
                  checked={this.props.allActive}
                  onChange={() => {
                    this.props.allActive
                      ? this.props.toggleAllOff()
                      : this.props.toggleAllOn();
                  }}
                />
                <AllSelector>All</AllSelector>
              </ListItem>
              <Seperator />
              {this.props.items.map((item, i) => (
                <ListItem key={item.get('name')}>
                  <input
                    type="checkbox"
                    onChange={() => this.props.toggleItem(item.get('name'))}
                    value={item.get('name')}
                    checked={item.get('active')}
                    key={i}
                  />
                  <span key={`listItemName${i}`} style={{ float: 'right' }}>
                    {item.get('name')}
                  </span>
                </ListItem>
              ))}
            </ItemList>
          </SubMenu>
        ]}
      </div>
    );
  }
}

//
export default CheckboxMenu;
