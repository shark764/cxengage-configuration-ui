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
import DetailWrapper from '../../../components/DetailWrapper';

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
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  reasonListsItems,
  reasonListsFields,
  removeListItem,
  setSelectedSubEntityId,
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
      <DetailWrapper open={true}>
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${usersItems.length > 1 ? usersItems.length : ''} Users`}
          onActionButtonClick={() => setSelectedSubEntityId('users')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="users"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={usersItems}
          fields={usersFields}
        />
      </DetailWrapper>
      <DetailWrapper open={false} contains="outboundIdentifierLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            outboundIdentifierListsItems.length > 1 ? outboundIdentifierListsItems.length : ''
          } Outbound Identifier Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('outboundIdentifierLists')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="outboundIdentifierLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={outboundIdentifierListsItems}
          inherited={inherited}
          fields={outboundIdentifierListsFields}
        />
      </DetailWrapper>
      <DetailWrapper open={false} contains="reasonLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${reasonListsItems.length > 1 ? reasonListsItems.length : ''} Presence Reason Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('reasonLists')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="reasonLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={reasonListsItems}
          inherited={inherited}
          fields={reasonListsFields}
        />
      </DetailWrapper>
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
  usersItems: PropTypes.array,
  usersFields: PropTypes.array,
  reasonListsItems: PropTypes.array,
  reasonListsFields: PropTypes.array,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number
};
