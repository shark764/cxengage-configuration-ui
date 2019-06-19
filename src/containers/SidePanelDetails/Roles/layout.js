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
  parentTenantName,
  isUserPlatformAdmin,
  isSystemRole
}) {
  return (
    <Wrapper id="dtpanel-roles">
      {(isSystemRole || inherited) && (
        <DetailsPanelAlert
          text={`This role is inherited ${
            parentTenantName && location.hash.includes('alpha') ? `from ${parentTenantName}` : ''
          } and cannot be edited.`}
        />
      )}
      {children}

      <DetailHeader
        userHasUpdatePermission={
          (!isSystemRole && userHasUpdatePermission && !inherited) || (isUserPlatformAdmin && isSystemRole)
        }
        text={`${listSize} Permissions`}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={
          !inherited && userHasUpdatePermission && !isSystemRole
            ? (listItemId, subEntityName) => removeListItem(listItemId, subEntityName)
            : undefined
        }
        inherited={inherited}
        items={tableItems}
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
  parentTenantName: PropTypes.string,
  isUserPlatformAdmin: PropTypes.bool,
  isSystemRole: PropTypes.bool
};
