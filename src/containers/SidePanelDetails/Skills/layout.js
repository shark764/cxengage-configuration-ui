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
import { detailHeadertext } from '../../../utils';

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
  usersFetching,
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  outboundIdentifierListsFetching,
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
          userHasUpdatePermission={!usersFetching && userHasUpdatePermission}
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
          fetching={usersFetching}
        />
      </DetailWrapper>
      <DetailWrapper open={false} contains="outboundIdentifierLists">
        <WrappedDetailHeader
          userHasUpdatePermission={!outboundIdentifierListsFetching && userHasUpdatePermission}
          text={detailHeadertext(outboundIdentifierListsItems, 'Outbound Identifier Lists')}
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
          fetching={outboundIdentifierListsFetching}
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
  usersFetching: PropTypes.bool,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  outboundIdentifierListsFetching: PropTypes.bool,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  defaultFilters: PropTypes.object

};
