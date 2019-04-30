/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifiersDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SidePanelTable, DetailHeader, DetailsPanelAlert } from 'cx-ui-components';

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
  itemApiPending,
  parentTenantName
}) {
  return (
    <Wrapper id="dtpanel-roles">
      {inherited && (
        <DetailsPanelAlert
          text={`This role is inherited ${parentTenantName ? `from ${parentTenantName}` : ''} and cannot be edited.`}
        />
      )}
      {children}

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
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

RolesDetailsPanel.propTypes = {
  rolesFetching: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number,
  inherited: PropTypes.bool,
  itemApiPending: PropTypes.string,
  parentTenantName: PropTypes.string
};
