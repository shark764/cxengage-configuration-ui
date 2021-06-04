/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SlasDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader, DetailsPanelAlert } from 'cx-ui-components';
import { detailHeaderText } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function SlasDetailsPanel({
  children,
  inherited,
  userHasUpdatePermission,
  userHasViewPermission,
  slasFetching,
  versionsItems,
  versionsFields,
  setSelectedSubEntityId,
  itemApiPending
}) {
  return (
    <Wrapper className="dtpanel-entity-slas">
      {inherited && <DetailsPanelAlert text={`This SLA is inherited and cannot be edited.`} />}
      {children}

      <DetailHeader
        userHasUpdatePermission={!slasFetching && !inherited && userHasUpdatePermission}
        text={detailHeaderText(versionsItems, 'Published Versions')}
        onActionButtonClick={() => setSelectedSubEntityId('versions')}
        inherited={inherited}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        contains="versions"
        userHasUpdatePermission={userHasUpdatePermission}
        userHasViewPermission={userHasViewPermission}
        viewSubEntity={(listItemId, row) => setSelectedSubEntityId(row.versionId)}
        items={versionsItems}
        fields={versionsFields}
        defaultSorted={[{ id: 'numericOrderVersion' }]}
        fetching={slasFetching && !versionsItems.length}
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

SlasDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  inherited: PropTypes.bool,
  children: PropTypes.any,
  slasFetching: PropTypes.bool,
  versionsItems: PropTypes.array,
  versionsFields: PropTypes.array,
  itemApiPending: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func
};
