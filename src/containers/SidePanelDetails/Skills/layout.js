/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SkillsDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail, SidePanelTable, DetailHeader } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function SkillsDetailsPanel({
  children,
  userHasUpdatePermission,
  usersItems,
  usersFields,
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  removeListItem,
  setSelectedSubEntityId,
  item: { name, description, active, hasProficiency },
  defaultFilters
}) {
  return (
    <Wrapper id="dtpanel-skills">
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
          <Detail label="Has Proficiency" value={hasProficiency ? 'Yes' : 'No'} />
          <Detail label="Status" value={active ? 'Enabled' : 'Disabled'} />
        </Fragment>
      )}
      <DetailWrapper open={true}>
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${usersItems.length > 1 ? usersItems.length : ''} Users`}
          onActionButtonClick={() => setSelectedSubEntityId('users')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="users"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={usersItems}
          fields={usersFields}
          filtered={defaultFilters.users}
        />
      </DetailWrapper>
      <DetailWrapper open={false} contains="outboundIdentifierLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            outboundIdentifierListsItems.length > 1 ? outboundIdentifierListsItems.length : ''
          } Outbound Identifier Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('outboundIdentifierLists')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="outboundIdentifierLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={outboundIdentifierListsItems}
          fields={outboundIdentifierListsFields}
          filtered={defaultFilters.outboundIdentifierLists}
        />
      </DetailWrapper>
    </Wrapper>
  );
}

SkillsDetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    hasProficiency: PropTypes.bool,
    active: PropTypes.bool
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  usersItems: PropTypes.array,
  usersFields: PropTypes.array,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number,
  defaultFilters: PropTypes.object
};
