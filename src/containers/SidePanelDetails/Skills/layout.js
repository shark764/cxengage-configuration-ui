/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * SkillsDetailsPanel
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
`;

export default function SkillsDetailsPanel({
  children,
  userHasUpdatePermission,
  tableItems,
  tableFields,
  removeListItem,
  setSelectedSubEntityId,
  listSize,
  item: {
    name,
    description,
    hasProficiency,
    active
  }
}) {
  return (
    <Wrapper id="dtpanel-skills">
      {userHasUpdatePermission ? (
        children
      ) : (
        <Fragment>
          <Detail label="Name" value={name} />
          <Detail label="Description" value={description} />
          <Detail label="Has Proficiency" value={hasProficiency ? 'Yes' : 'No'} />
          <Detail label="Status" value={active ? 'Enabled' : 'Disabled'} />
        </Fragment>
      )}
      <DetailHeader
        userHasUpdatePermission={userHasUpdatePermission}
        text={`${listSize} Member(s)`}
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

SkillsDetailsPanel.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    hasProficiency: PropTypes.bool,
    active: PropTypes.bool
  }),
  userHasUpdatePermission: PropTypes.bool,
  children: PropTypes.any,
  tableItems: PropTypes.array,
  tableFields: PropTypes.array,
  removeListItem: PropTypes.func,
  setSelectedSubEntityId: PropTypes.func,
  listSize: PropTypes.number
};
