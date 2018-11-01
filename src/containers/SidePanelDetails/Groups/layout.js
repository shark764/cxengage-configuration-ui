/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GroupsDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail, SidePanelTable, DetailHeader, DetailsPanelAlert } from 'cx-ui-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function GroupsDetailsPanel({
  children,
  userHasUpdatePermission,
  tableItems,
  tableFields,
  removeListItem,
  setSelectedSubEntityId,
  listSize,
  inherited,
  item: { name, description, active }
}) {
  return (
    <Wrapper id="dtpanel-groups">
      {inherited && <DetailsPanelAlert text="This group is inherited and cannot be edited" />}
      {!inherited && userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
          <Detail label="Status" value={active ? 'Enabled' : 'Disabled'} />
        </Fragment>
      )}
      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${listSize} ${listSize > 1 ? 'Users' : 'User(s)'}`}
        onActionButtonClick={() => setSelectedSubEntityId('users')}
      />
      <SidePanelTable
        contains="users"
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        items={tableItems}
        fields={tableFields}
      />
    </Wrapper>
  );
}

GroupsDetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool
  }),
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number
};
