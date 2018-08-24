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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
`;

export function OutboundIdentifierListsDetailsPanel({
  children,
  userHasUpdatePermission,
  id,
  className,
  tableItems,
  toggleEntityListItemActive,
  removeListItem,
  setSelectedSubEntityId,
  listSize,
  item: { name, description }
}) {
  return (
    <Wrapper id={id} className={className}>
      <DetailHeader text="Details" />
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
        </Fragment>
      )}
      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${listSize} List Item(s)`}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
      />
      <SidePanelTable
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        toggleSubEntityActive={toggleEntityListItemActive}
        items={tableItems}
        fields={[
          {
            label: 'Name',
            name: 'name'
          },
          {
            label: 'Value',
            name: 'value'
          },
          {
            label: 'Channel Type',
            name: 'channelType'
          },
          {
            label: 'Description',
            name: 'description'
          }
        ]}
      />
    </Wrapper>
  );
}

OutboundIdentifierListsDetailsPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  toggleEntityListItemActive: PropTypes.func,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number
};
