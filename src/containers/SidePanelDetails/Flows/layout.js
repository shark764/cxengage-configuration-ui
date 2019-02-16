/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FlowsDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader } from 'cx-ui-components';
import { detailHeaderText } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FlowsDetailsPanel({
  children,
  userHasUpdatePermission,
  flowsFetching,
  versionsItems,
  versionsFields,
  draftsItems,
  draftsFields,
  openFlowDesigner,
  createDraftItem,
  removeListItem,
  copyListItem,
  itemApiPending
}) {
  return (
    <Wrapper className="dtpanel-entity-flows">
      {children}

      <DetailHeader
        userHasUpdatePermission={!flowsFetching && userHasUpdatePermission}
        text={detailHeaderText(versionsItems, 'Published Versions')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        contains="versions"
        userHasUpdatePermission={userHasUpdatePermission}
        viewSubEntity={openFlowDesigner}
        copySubEntity={copyListItem}
        updateSubEntity={(listItemId, row, subEntityName) => createDraftItem('drafts', row, subEntityName)}
        items={versionsItems}
        fields={versionsFields}
        fetching={flowsFetching}
        itemApiPending={itemApiPending}
      />

      <DetailHeader
        userHasUpdatePermission={!flowsFetching && userHasUpdatePermission}
        text={detailHeaderText(draftsItems, 'Drafts')}
        onActionButtonClick={() => createDraftItem('drafts')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        contains="drafts"
        userHasUpdatePermission={userHasUpdatePermission}
        viewSubEntity={openFlowDesigner}
        deleteSubEntity={removeListItem}
        confirmDeleteSubEntity={true}
        copySubEntity={copyListItem}
        items={draftsItems}
        fields={draftsFields}
        fetching={flowsFetching}
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

FlowsDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  flowsFetching: PropTypes.bool,
  versionsItems: PropTypes.array,
  versionsFields: PropTypes.array,
  draftsItems: PropTypes.array,
  draftsFields: PropTypes.array,
  openFlowDesigner: PropTypes.func,
  removeListItem: PropTypes.func,
  copyListItem: PropTypes.func,
  itemApiPending: PropTypes.string,
  createDraftItem: PropTypes.func
};
