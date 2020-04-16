/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * UsersDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader, ConfirmationWrapper, Button } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import { detailHeaderText } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const ImpersonateButton = styled(Button)`
  margin: 10px;
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
  defaultFilters,
  sidePanelUpdatePermissions,
  sidePanelReadPermissions,
  itemApiPending,
  setTenantUserAsImpersonated,
  userDisplay,
  userHasLogiImpersonatePermissions
}) {
  return (
    <Wrapper id="dtpanel-users">
      {children}

      {sidePanelReadPermissions.skills && (
        <DetailWrapper open={false} data-automation="skillsSVG" contains="skills">
          <WrappedDetailHeader
            userHasUpdatePermission={!skillsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.skills}
            text={detailHeaderText(skillsItems, 'Skills')}
            onActionButtonClick={() => setSelectedSubEntityId('skills')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="skills"
            userHasUpdatePermission={!skillsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.skills}
            deleteSubEntity={removeListItem}
            items={skillsItems}
            fields={skillsFields}
            filtered={defaultFilters.skills}
            fetching={skillsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {sidePanelReadPermissions.groups && (
        <DetailWrapper open={false} data-automation="groupsSVG" contains="groups">
          <WrappedDetailHeader
            userHasUpdatePermission={!groupsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.groups}
            text={detailHeaderText(groupsItems, 'Groups')}
            onActionButtonClick={() => setSelectedSubEntityId('groups')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="groups"
            userHasUpdatePermission={!groupsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.groups}
            deleteSubEntity={removeListItem}
            items={groupsItems}
            fields={groupsFields}
            filtered={defaultFilters.groups}
            fetching={groupsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {sidePanelReadPermissions.reasonLists && (
        <DetailWrapper open={false} data-automation="reasonListsSVG" contains="reasonLists">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !reasonListsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.reasonLists
            }
            text={detailHeaderText(reasonListsItems, 'Presence Reason Lists')}
            onActionButtonClick={() => setSelectedSubEntityId('reasonLists')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="reasonLists"
            userHasUpdatePermission={
              !reasonListsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.reasonLists
            }
            deleteSubEntity={removeListItem}
            items={reasonListsItems}
            fields={reasonListsFields}
            defaultSorted={[
              { id: 'name', desc: false },
              { id: 'description', desc: false },
              { id: 'active', desc: false }
            ]}
            filtered={defaultFilters.reasonLists}
            fetching={reasonListsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {sidePanelReadPermissions.messageTemplates && (
        <DetailWrapper open={false} data-automation="messageTemplatesSVG" contains="messageTemplates">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !messageTemplatesFetching && userHasUpdatePermission && sidePanelUpdatePermissions.messageTemplates
            }
            text={detailHeaderText(messageTemplatesItems, 'Message Templates')}
            onActionButtonClick={() => setSelectedSubEntityId('messageTemplates')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="messageTemplates"
            userHasUpdatePermission={
              !messageTemplatesFetching && userHasUpdatePermission && sidePanelUpdatePermissions.messageTemplates
            }
            deleteSubEntity={removeListItem}
            items={messageTemplatesItems}
            fields={messageTemplatesFields}
            filtered={defaultFilters.messageTemplates}
            fetching={messageTemplatesFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {sidePanelReadPermissions.transferLists && (
        <DetailWrapper open={false} data-automation="transferListsSVG" contains="transferLists">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !transferListsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.transferLists
            }
            text={detailHeaderText(transferListsItems, 'Transfer Lists')}
            onActionButtonClick={() => setSelectedSubEntityId('transferLists')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="transferLists"
            userHasUpdatePermission={
              !transferListsFetching && userHasUpdatePermission && sidePanelUpdatePermissions.transferLists
            }
            deleteSubEntity={removeListItem}
            items={transferListsItems}
            fields={transferListsFields}
            filtered={defaultFilters.transferLists}
            fetching={transferListsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {sidePanelReadPermissions.outboundIdentifierLists && (
        <DetailWrapper open={false} data-automation="outboundIdentifierListsSVG" contains="outboundIdentifierLists">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !outboundIdentifierListsFetching &&
              userHasUpdatePermission &&
              sidePanelUpdatePermissions.outboundIdentifierLists
            }
            text={detailHeaderText(outboundIdentifierListsItems, 'Outbound Identifier Lists')}
            onActionButtonClick={() => setSelectedSubEntityId('outboundIdentifierLists')}
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="outboundIdentifierLists"
            userHasUpdatePermission={
              !outboundIdentifierListsFetching &&
              userHasUpdatePermission &&
              sidePanelUpdatePermissions.outboundIdentifierLists
            }
            deleteSubEntity={removeListItem}
            items={outboundIdentifierListsItems}
            fields={outboundIdentifierListsFields}
            filtered={defaultFilters.outboundIdentifierLists}
            fetching={outboundIdentifierListsFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}

      {userHasLogiImpersonatePermissions && (
        <Fragment>
          <DetailHeader text="Reporting Settings" />
          <ConfirmationWrapper
            confirmBtnCallback={setTenantUserAsImpersonated}
            mainText={`This will set tenant user "${userDisplay}" as impersonated for advanced reports. You can stop impersonating by ending session or switching to another tenant.`}
            secondaryText={'Are you sure you want to continue?'}
          >
            <ImpersonateButton type="button" buttonType="primary">
              Manage reports on behalf of this user
            </ImpersonateButton>
          </ConfirmationWrapper>
        </Fragment>
      )}
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
  defaultFilters: PropTypes.object,
  sidePanelUpdatePermissions: PropTypes.object,
  sidePanelReadPermissions: PropTypes.object,
  itemApiPending: PropTypes.string,
  setTenantUserAsImpersonated: PropTypes.func,
  userDisplay: PropTypes.string,
  userHasLogiImpersonatePermissions: PropTypes.bool
};
