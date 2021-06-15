/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * FlowsDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader, LoadingSpinnerSVG } from 'cx-ui-components';
import { detailHeaderText, parentUrl } from '../../../utils';
import DetailWrapper from '../../../components/DetailWrapper';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const CenterWrapper = styled.div`
  text-align: center;
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
  itemApiPending,
}) {
  return (
    <Wrapper className="dtpanel-entity-flows">
      {children}
      {flowsFetching && (
        <CenterWrapper>
          <LoadingSpinnerSVG size={100} />
        </CenterWrapper>
      )}
      {!flowsFetching && (
        <Fragment>
          <DetailWrapper open data-automation="publishedFlowsSVG">
            <WrappedDetailHeader
              userHasUpdatePermission={!flowsFetching && userHasUpdatePermission}
              text={detailHeaderText(versionsItems, 'Published Versions')}
            />
            <SidePanelTable
              tableType={'sidePanel'}
              contains="versions"
              userHasUpdatePermission={userHasUpdatePermission}
              userHasViewPermission={userHasViewPermission}
              viewSubEntity={openFlowDesigner}
              copySubEntity={copyListItem}
              updateSubEntity={(listItemId, row, subEntityName) => createDraftItem('drafts', row, subEntityName)}
              items={versionsItems.map((versionItem) => ({
                ...versionItem,
                viewSubEntityHyperLink: parentUrl + '#/flows/viewer/' + versionItem.flowId + '/' + versionItem.version,
              }))}
              fields={versionsFields}
              defaultSorted={[{ id: 'numericOrderVersion' }]}
              fetching={flowsFetching && !versionsItems.length}
              itemApiPending={itemApiPending}
            />
          </DetailWrapper>
          <DetailWrapper open data-automation="draftsFlowsSVG">
            <WrappedDetailHeader
              userHasUpdatePermission={!flowsFetching && userHasUpdatePermission}
              text={detailHeaderText(draftsItems, 'Drafts')}
              onActionButtonClick={() => createDraftItem('drafts')}
            />
            <SidePanelTable
              tableType={'sidePanel'}
              contains="drafts"
              userHasUpdatePermission={userHasUpdatePermission}
              updateSubEntity={openFlowDesigner}
              deleteSubEntity={removeListItem}
              confirmDeleteSubEntity={true}
              copySubEntity={copyListItem}
              items={draftsItems.map((draftItem) => ({
                ...draftItem,
                updateSubEntityHyperLink: parentUrl + '#/flows/editor/' + draftItem.flowId + '/' + draftItem.id,
              }))}
              fields={draftsFields}
              defaultSorted={[{ id: 'created', desc: true }]}
              fetching={flowsFetching && !draftsItems.length}
              itemApiPending={itemApiPending}
            />
          </DetailWrapper>
        </Fragment>
      )}
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
  createDraftItem: PropTypes.func,
};

FlowsDetailsPanel.defaultProps = {
  versionsItems: [],
  draftsItems: [],
};
