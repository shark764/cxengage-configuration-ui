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
  inherited,
  tableItems,
  tableFields,
  removeListItem,
  setSelectedSubEntityId,
  listSize
}) {
  return (
    <Wrapper id="dtpanel-data-access-reports">
      {children}

      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${listSize} Member(s)`}
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
  listSize: PropTypes.number
};
