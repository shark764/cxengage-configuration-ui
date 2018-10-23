/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * OutboundIdentifiersDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Detail } from 'cx-ui-components';
import { DetailHeader } from 'cx-ui-components';
import { SidePanelTable } from 'cx-ui-components';
import { DetailsPanelAlert } from 'cx-ui-components';

import { DetailWrapper } from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
`;
const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export function RolesDetailsPanel({
  children,
  userHasUpdatePermission,
  id,
  className,
  tableItems,
  tableFields,
  inherited,
  removeListItem,
  setSelectedSubEntityId,
  listSize,
  item: { name, description }
}) {
  return (
    <Wrapper id={id} className={className}>
      <DetailWrapper open={true}>
        <WrappedDetailHeader text="Details" />
        {inherited && <DetailsPanelAlert text="This role is inherited and cannot be edited" />}
        {!inherited && userHasUpdatePermission ? (
          children
        ) : (
          <Fragment>
            <Detail label="Name" value={name} />
            <Detail label="Description" value={description} />
          </Fragment>
        )}
      </DetailWrapper>

      <DetailWrapper open={true}>
        <WrappedDetailHeader
          userHasUpdatePermission={userHasUpdatePermission}
          text={`${listSize} Permission(s)`}
          onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
          inherited={inherited}
        />
        <SidePanelTable
          userHasUpdatePermission={userHasUpdatePermission}
          deleteSubEntity={removeListItem}
          items={tableItems}
          inherited={inherited}
          fields={tableFields}
        />
      </DetailWrapper>
    </Wrapper>
  );
}

RolesDetailsPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number,
  inherited: PropTypes.bool
};
