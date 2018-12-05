/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function UsersDetailsPanel({
  children,
  userHasUpdatePermission,
  skillsItems,
  skillsFields,
  groupsItems,
  groupsFields,
  reasonListsItems,
  reasonListsFields,
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  transferListsItems,
  transferListsFields,
  messageTemplatesItems,
  messageTemplatesFields,
  removeListItem,
  setSelectedSubEntityId,
  defaultFilters
}) {
  return (
    <Wrapper id="dtpanel-users">
      {children}

      <DetailWrapper open={false} contains="skills">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${skillsItems.length > 1 ? skillsItems.length : ''} Skills`}
          onActionButtonClick={() => setSelectedSubEntityId('skills')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="skills"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={skillsItems}
          fields={skillsFields}
          filtered={defaultFilters.skills}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="groups">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${groupsItems.length > 1 ? groupsItems.length : ''} Groups`}
          onActionButtonClick={() => setSelectedSubEntityId('groups')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="groups"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={groupsItems}
          fields={groupsFields}
          filtered={defaultFilters.groups}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="reasonLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${reasonListsItems.length > 1 ? reasonListsItems.length : ''} Presence Reason Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('reasonLists')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="reasonLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={reasonListsItems}
          fields={reasonListsFields}
          filtered={defaultFilters.reasonLists}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="messageTemplates">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${messageTemplatesItems.length > 1 ? messageTemplatesItems.length : ''} Message Templates`}
          onActionButtonClick={() => setSelectedSubEntityId('messageTemplates')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="messageTemplates"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={messageTemplatesItems}
          fields={messageTemplatesFields}
          filtered={defaultFilters.messageTemplates}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="transferLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${transferListsItems.length > 1 ? transferListsItems.length : ''} Transfer Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('transferLists')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="transferLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={transferListsItems}
          fields={transferListsFields}
          filtered={defaultFilters.transferLists}
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

UsersDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  skillsItems: PropTypes.array,
  skillsFields: PropTypes.array,
  groupsItems: PropTypes.array,
  groupsFields: PropTypes.array,
  reasonListsItems: PropTypes.array,
  reasonListsFields: PropTypes.array,
  messageTemplatesItems: PropTypes.array,
  messageTemplatesFields: PropTypes.array,
  transferListsItems: PropTypes.array,
  transferListsFields: PropTypes.array,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  defaultFilters: PropTypes.object
};
