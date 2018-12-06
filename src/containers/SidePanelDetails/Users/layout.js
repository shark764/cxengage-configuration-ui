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
import { detailHeadertext } from '../../../utils';

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
  skillsFetching,
  groupsItems,
  groupsFields,
  groupsFetching,
  reasonListsItems,
  reasonListsFields,
  reasonListsFetching,
  outboundIdentifierListsItems,
  outboundIdentifierListsFields,
  outboundIdentifierListsFetching,
  transferListsItems,
  transferListsFields,
  transferListsFetching,
  messageTemplatesItems,
  messageTemplatesFields,
  messageTemplatesFetching,
  removeListItem,
  setSelectedSubEntityId,
  defaultFilters
}) {
  return (
    <Wrapper id="dtpanel-users">
      {children}

      <DetailWrapper open={false} contains="skills">
        <WrappedDetailHeader
          userHasUpdatePermission={!skillsFetching && userHasUpdatePermission}
          text={detailHeadertext(skillsItems, 'Skills')}
          onActionButtonClick={() => setSelectedSubEntityId('skills')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="skills"
          userHasUpdatePermission={!skillsFetching && userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={skillsItems}
          fields={skillsFields}
          filtered={defaultFilters.skills}
          fetching={skillsFetching}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="groups">
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={detailHeadertext(groupsItems, 'Groups')}
          onActionButtonClick={() => setSelectedSubEntityId('groups')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="groups"
          userHasUpdatePermission={!groupsFetching && userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={groupsItems}
          fields={groupsFields}
          filtered={defaultFilters.groups}
          fetching={groupsFetching}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="reasonLists">
        <WrappedDetailHeader
          userHasUpdatePermission={!reasonListsFetching && userHasUpdatePermission}
          text={detailHeadertext(reasonListsItems, 'Presence Reason Lists')}
          onActionButtonClick={() => setSelectedSubEntityId('reasonLists')}
        />
        <SidePanelTable
          tableType={'sidePanel'}
          contains="reasonLists"
          userHasUpdatePermission={!reasonListsFetching && userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={reasonListsItems}
          fields={reasonListsFields}
          filtered={defaultFilters.reasonLists}
          fetching={reasonListsFetching}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="messageTemplates">
        <WrappedDetailHeader
          userHasUpdatePermission={!messageTemplatesFetching && userHasUpdatePermission}
          text={detailHeadertext(messageTemplatesItems, 'Message Templates')}
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
          fetching={messageTemplatesFetching}
        />
      </DetailWrapper>

      <DetailWrapper open={false} contains="transferLists">
        <WrappedDetailHeader
          userHasUpdatePermission={!transferListsFetching && userHasUpdatePermission}
          text={detailHeadertext(transferListsItems, 'Transfer Lists')}
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
          fetching={transferListsFetching}
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

UsersDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  skillsItems: PropTypes.array,
  skillsFields: PropTypes.array,
  skillsFetching: PropTypes.bool,
  groupsItems: PropTypes.array,
  groupsFields: PropTypes.array,
  groupsFetching: PropTypes.bool,
  reasonListsItems: PropTypes.array,
  reasonListsFields: PropTypes.array,
  reasonListsFetching: PropTypes.bool,
  messageTemplatesItems: PropTypes.array,
  messageTemplatesFields: PropTypes.array,
  messageTemplatesFetching: PropTypes.bool,
  transferListsItems: PropTypes.array,
  transferListsFields: PropTypes.array,
  transferListsFetching: PropTypes.bool,
  outboundIdentifierListsItems: PropTypes.array,
  outboundIdentifierListsFields: PropTypes.array,
  outboundIdentifierListsFetching: PropTypes.bool,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  defaultFilters: PropTypes.object
};
