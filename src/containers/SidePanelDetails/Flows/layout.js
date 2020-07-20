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
import { detailHeaderText, parentUrl } from '../../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FlowsDetailsPanel({
  children,
  userHasUpdatePermission,
  userHasViewPermission,
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
        userHasViewPermission={userHasViewPermission}
        viewSubEntity={openFlowDesigner}
        copySubEntity={copyListItem}
        updateSubEntity={(listItemId, row, subEntityName) => createDraftItem('drafts', row, subEntityName)}
        items={versionsItems.map(versionItem => ({
          ...versionItem,
          viewSubEntityHyperLink: parentUrl + '#/flows/viewer/' + versionItem.flowId + '/' + versionItem.version
        }))}
        fields={versionsFields}
        defaultSorted={[{ id: 'numericOrderVersion', desc: true }]}
        fetching={flowsFetching && !versionsItems.length}
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
        updateSubEntity={openFlowDesigner}
        deleteSubEntity={removeListItem}
        confirmDeleteSubEntity={true}
        copySubEntity={copyListItem}
        items={draftsItems.map(draftItem => ({
          ...draftItem,
          updateSubEntityHyperLink: parentUrl + '#/flows/editor/' + draftItem.flowId + '/' + draftItem.id
        }))}
        fields={draftsFields}
        defaultSorted={[{ id: 'created', desc: true }]}
        fetching={flowsFetching && !draftsItems.length}
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

FlowsDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
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

FlowsDetailsPanel.defaultProps = {
  versionsItems: [],
  draftsItems: []
};
