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
import { detailHeadertext } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
`;

export default function OutboundIdentifierListsDetailsPanel({
  children,
  userHasUpdatePermission,
  id,
  className,
  tableItems,
  tableFields,
  outboundIdentifiersFetching,
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
        userHasUpdatePermission={!outboundIdentifiersFetching && userHasUpdatePermission}
        text={detailHeadertext(tableItems, 'Outbound Identifiers')}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        toggleSubEntityActive={toggleEntityListItemActive}
        items={tableItems}
        fields={tableFields}
        fetching={outboundIdentifiersFetching}
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
  tableFields: PropTypes.array,
  outboundIdentifiersFetching: PropTypes.bool,
  toggleEntityListItemActive: PropTypes.func,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func
};
