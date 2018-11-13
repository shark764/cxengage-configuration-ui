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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DataAccessReportsDetailsPanel({
  children,
  userHasUpdatePermission,
  tableItems,
  tableFields,
  removeListItem,
  setSelectedSubEntityId
}) {
  return (
    <Wrapper id="dtpanel-data-access-reports">
      {children}

      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${tableItems.length > 1 ? tableItems.length : ''} Member(s)`}
        onActionButtonClick={() => setSelectedSubEntityId('addItemToList')}
      />
      <SidePanelTable
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        items={tableItems}
        fields={tableFields}
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
  setSelectedSubEntityId: PropTypes.func
};
