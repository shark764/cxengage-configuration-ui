/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * AddMemberToList
 *
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SidePanelTable } from 'cx-ui-components';
import { CloseIconSVG } from 'cx-ui-components';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;
const Item = styled.h3`
  color: #474747;
  font-size: 28px;
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-weight: initial;
  margin-left: 30px;
  margin-bottom: -7px;
  padding-right: 10px;
`;

const CloseButtonWrapper = styled.div`
  float: right;
`;

export default function AddMemberToList(props) {
  return (
    <Fragment>
      <div>
        <Header>Add list items : </Header>
        <Item title={props.listName}>{props.listName}</Item>
        <CloseButtonWrapper>
          <CloseIconSVG onClick={props.onCancel} size={18} closeIconType="secondary" />
        </CloseButtonWrapper>
      </div>
      <SidePanelTable
        tableType={'modal'}
        contains={props.contains}
        userHasUpdatePermission={props.userHasUpdatePermission}
        addSubEntity={props.addListItem}
        toggleSubEntityActive={
          props.entityName !== 'roles' && props.entityName !== 'dataAccessReports'
            ? props.toggleEntityListItemActive
            : null
        }
        items={props.tableItems}
        fields={props.fields}
        filtered={props.defaultFilters}
      />
    </Fragment>
  );
}

AddMemberToList.propTypes = {
  entityName: PropTypes.string,
  contains: PropTypes.string,
  listName: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  addListItem: PropTypes.func,
  toggleEntityListItemActive: PropTypes.func,
  userHasUpdatePermission: PropTypes.bool.isRequired,
  tableItems: PropTypes.array,
  fields: PropTypes.array
};
