/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifiersDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Detail, SidePanelTable, DetailHeader, DetailsPanelAlert } from 'cx-ui-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
`;

export function RolesDetailsPanel({
  children,
  userHasUpdatePermission,
  tableItems,
  tableFields,
  rolesFetching,
  inherited,
  removeListItem,
  setSelectedSubEntityId,
  listSize,
  item: { name, description }
}) {
  return (
    <Wrapper id="dtpanel-roles">
      {inherited && <DetailsPanelAlert text="This role is inherited and cannot be edited" />}
      {!inherited && userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
        </Fragment>
      )}

      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${listSize} Permissions`}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
        inherited={inherited}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        items={tableItems}
        inherited={inherited}
        fields={tableFields}
        fetching={rolesFetching}
      />
    </Wrapper>
  );
}

RolesDetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }),
  rolesFetching: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number,
  inherited: PropTypes.bool
};
