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
  inherited, 
  setSelectedSubEntityId  
}) {
  return <Wrapper id="dtpanel-users">
  {children}
  
      <DetailWrapper open={false} contains="skills">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            skillsItems.length > 1 ? skillsItems.length : ''
          } Skills`}
          onActionButtonClick={() => setSelectedSubEntityId('skills')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="skills"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={skillsItems}
          inherited={inherited}
          fields={skillsFields}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="groups">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            groupsItems.length > 1 ? groupsItems.length : ''
          } Groups`}
          onActionButtonClick={() => setSelectedSubEntityId('groups')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="groups"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={groupsItems}
          inherited={inherited}
          fields={groupsFields}
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

      <DetailWrapper open={false} contains="messageTemplates">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            messageTemplatesItems.length > 1 ? messageTemplatesItems.length : ''
          } Message Templates`}
          onActionButtonClick={() => setSelectedSubEntityId('messageTemplates')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="messageTemplates"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={messageTemplatesItems}
          inherited={inherited}
          fields={messageTemplatesFields}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="transferLists">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${
            transferListsItems.length > 1 ? transferListsItems.length : ''
          } Transfer Lists`}
          onActionButtonClick={() => setSelectedSubEntityId('transferLists')}
          inherited={inherited}
        />
        <SidePanelTable
          contains="transferLists"
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={transferListsItems}
          inherited={inherited}
          fields={transferListsFields}
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


  </Wrapper>;
}

UsersDetailsPanel.propTypes = {
  inherited: PropTypes.bool,
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
};
