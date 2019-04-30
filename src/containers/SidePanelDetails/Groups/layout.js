/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * GroupsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader, DetailsPanelAlert } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import { detailHeaderText } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function GroupsDetailsPanel({
  children,
  userHasUpdatePermission,
  usersItems,
  usersFields,
  usersFetching,
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  outboundIdentifierListsFetching,
  reasonListsItems,
  reasonListsFields,
  reasonListsFetching,
  removeListItem,
  setSelectedSubEntityId,
  inherited,
  defaultFilters,
  sidePanelReadPermissions,
  sidePanelUpdatePermissions,
  itemApiPending
}) {
  return (
    <Wrapper id="dtpanel-groups">
      {inherited && <DetailsPanelAlert text="This group is inherited and cannot be edited" />}
      {children}

      {sidePanelReadPermissions.users && (
        <DetailWrapper open={true} autoCloseOverride>
          <WrappedDetailHeader
            userHasUpdatePermission={!usersFetching && userHasUpdatePermission}
            text={detailHeaderText(usersItems, 'Users')}
            onActionButtonClick={() => setSelectedSubEntityId('users')}
            inherited={inherited}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="users"
            userHasUpdatePermission={userHasUpdatePermission}
            deleteSubEntity={removeListItem}
            items={usersItems}
            fields={usersFields}
            filtered={defaultFilters.users}
            fetching={usersFetching}
            inherited={inherited}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}
      {sidePanelReadPermissions.outboundIdentifierLists && (
        <DetailWrapper open={false} contains="outboundIdentifierLists">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !outboundIdentifierListsFetching &&
              userHasUpdatePermission &&
              sidePanelUpdatePermissions.outboundIdentifierLists
            }
            text={detailHeaderText(outboundIdentifierListsItems, 'Outbound Identifier Lists')}
            onActionButtonClick={() => setSelectedSubEntityId('outboundIdentifierLists')}
            inherited={inherited}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="outboundIdentifierLists"
            userHasUpdatePermission={userHasUpdatePermission && sidePanelUpdatePermissions.outboundIdentifierLists}
            deleteSubEntity={removeListItem}
            items={outboundIdentifierListsItems}
            inherited={inherited}
            fields={outboundIdentifierListsFields}
            filtered={defaultFilters.outboundIdentifierLists}
            fetching={outboundIdentifierListsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}
      {sidePanelReadPermissions.reasonLists && (
        <DetailWrapper open={false} contains="reasonLists">
          <WrappedDetailHeader
            userHasUpdatePermission={!reasonListsFetching && userHasUpdatePermission}
            text={detailHeaderText(reasonListsItems, 'Presence Reason Lists')}
            onActionButtonClick={() => setSelectedSubEntityId('reasonLists')}
            inherited={inherited}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="reasonLists"
            userHasUpdatePermission={userHasUpdatePermission}
            deleteSubEntity={removeListItem}
            items={reasonListsItems}
            inherited={inherited}
            fields={reasonListsFields}
            filtered={defaultFilters.reasonLists}
            fetching={reasonListsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}
    </Wrapper>
  );
}

GroupsDetailsPanel.propTypes = {
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  usersItems: PropTypes.array,
  usersFields: PropTypes.array,
  usersFetching: PropTypes.bool,
  reasonListsItems: PropTypes.array,
  reasonListsFields: PropTypes.array,
  reasonListsFetching: PropTypes.bool,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  outboundIdentifierListsFetching: PropTypes.bool,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  defaultFilters: PropTypes.object,
  sidePanelReadPermissions: PropTypes.object,
  sidePanelUpdatePermissions: PropTypes.object,
  itemApiPending: PropTypes.string
};
