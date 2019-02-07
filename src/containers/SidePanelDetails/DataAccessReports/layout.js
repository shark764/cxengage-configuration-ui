/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DataAccessReportsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DetailHeader, SidePanelTable } from 'cx-ui-components';
import { detailHeaderText } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DataAccessReportsDetailsPanel({
  children,
  userHasUpdatePermission,
  tableItems,
  tableFields,
  defaultFilters,
  removeListItem,
  setSelectedSubEntityId,
  itemApiPending
}) {
  return (
    <Wrapper id="dtpanel-data-access-reports">
      {children}

      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={detailHeaderText(tableItems, 'Users')}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        items={tableItems}
        fields={tableFields}
        filtered={defaultFilters}
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

DataAccessReportsDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  inherited: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  defaultFilters: PropTypes.array,
  itemApiPending: PropTypes.string
};
