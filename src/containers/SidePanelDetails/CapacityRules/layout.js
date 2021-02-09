/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CapacityRulesDetailsPanel
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

export default function CapacityRulesDetailsPanel({
  children,
  userHasUpdatePermission,
  versions,
  setSelectedSubEntityId,
  tableFields,
  intl: { formatMessage },
}) {
  return (
    <Wrapper>
      {children}
      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={formatMessage({
          id: 'capacityRules.publishedVersions',
          defaultMessage: 'Published Versions',
        })}
        onActionButtonClick={() => setSelectedSubEntityId('create')}
        open
      />
      <SidePanelTable
        tableType="sidePanel"
        contains="versions"
        userHasUpdatePermission={userHasUpdatePermission}
        userHasViewPermission={userHasUpdatePermission}
        viewSubEntity={(listItemId) => setSelectedSubEntityId(listItemId)}
        items={versions}
        fields={tableFields.map(({ messageId, label, ...field }) => ({
          ...field,
          label,
          ...(messageId
            ? {
                label: formatMessage({
                  id: messageId,
                  defaultMessage: label,
                }),
              }
            : {}),
        }))}
        defaultSorted={[{ id: 'numericOrderVersion', desc: true }]}
        fetching={!versions}
        actionHeaderMessage={formatMessage({
          id: 'tables.header.actionColumn',
          defaultMessage: 'Actions',
        })}
      />
    </Wrapper>
  );
}

CapacityRulesDetailsPanel.propTypes = {
  children: PropTypes.any,
  intl: PropTypes.object.isRequired,
  userHasUpdatePermission: PropTypes.bool,
  setSelectedSubEntityId: PropTypes.func.isRequired,
  versions: PropTypes.array,
  tableFields: PropTypes.array,
};
