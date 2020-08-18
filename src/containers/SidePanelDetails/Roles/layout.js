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

/*  TODO - CXV1-17410 */
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
  //  isUserPlatformAdmin,
  isSystemRole,
  sidePanelUpdatePermissions
}) {
  return (
    <Wrapper id="dtpanel-roles">
      {inherited && (
        <DetailsPanelAlert
          text={`This role is inherited ${parentTenantName && `from ${parentTenantName}`} and cannot be edited.`}
        />
      )}
      {isSystemRole && <DetailsPanelAlert text={`This is a system role and cannot be edited.`} />}
      {children}

      <DetailHeader
        userHasUpdatePermission={
          !isSystemRole && userHasUpdatePermission && !inherited && sidePanelUpdatePermissions.users // || (isUserPlatformAdmin && isSystemRole
        }
        text={`${listSize} Permissions`}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={userHasUpdatePermission && sidePanelUpdatePermissions.users}
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
  //  isUserPlatformAdmin: PropTypes.bool,
  isSystemRole: PropTypes.bool,
  sidePanelUpdatePermissions: PropTypes.object
};
