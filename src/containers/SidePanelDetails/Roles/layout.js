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
import { SidePanelTable, DetailHeader, DetailsPanelAlert, LoadingSpinnerSVG } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import { detailHeaderText } from '../../../utils';

/*  TODO - CXV1-17410 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const CenterWrapper = styled.div`
  text-align: center;
`;

export function RolesDetailsPanel({
  children,
  userHasUpdatePermission,
  permissions,
  rolesFields,
  rolesFetching,
  inherited,
  removeListItem,
  setSelectedSubEntityId,
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
      {rolesFetching && (
        <CenterWrapper>
          <LoadingSpinnerSVG size={100} />
        </CenterWrapper>
      )}
      {!rolesFetching && (
        <DetailWrapper open data-automation="rolesPermissionsSVG">
          <WrappedDetailHeader
            userHasUpdatePermission={
              !isSystemRole && userHasUpdatePermission && !inherited && sidePanelUpdatePermissions.users // || (isUserPlatformAdmin && isSystemRole
            }
            text={detailHeaderText(permissions, 'Permissions')}
            onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
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
            items={permissions}
            fields={rolesFields}
            fetching={rolesFetching}
            itemApiPending={itemApiPending}
          />
        </DetailWrapper>
      )}
    </Wrapper>
  );
}

RolesDetailsPanel.propTypes = {
  rolesFetching: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  permissions: PropTypes.array,
  rolesFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  inherited: PropTypes.bool,
  itemApiPending: PropTypes.string,
  parentTenantName: PropTypes.string,
  //  isUserPlatformAdmin: PropTypes.bool,
  isSystemRole: PropTypes.bool,
  sidePanelUpdatePermissions: PropTypes.object
};
