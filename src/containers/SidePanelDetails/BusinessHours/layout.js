/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BusinessHoursDetailsPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DetailHeader, SidePanelTable } from 'cx-ui-components';

import { detailHeaderText } from '../../../utils';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function BusinessHoursDetailsPanel({
  children,
  userHasUpdatePermission,
  userHasViewPermission,
  businessHoursFetching,
  exceptionsItems,
  setSelectedSubEntityId,
  removeListItem,
  itemApiPending
}) {
  return (
    <Wrapper className="dtpanel-entity-business-hours">
      {children}

      <DetailHeader
        userHasUpdatePermission={!businessHoursFetching && userHasUpdatePermission}
        text={detailHeaderText(exceptionsItems, 'Exceptions')}
        onActionButtonClick={() => setSelectedSubEntityId('create')}
        open
      />
      <SidePanelTable
        tableType={'sidePanel'}
        contains="exceptions"
        userHasUpdatePermission={userHasUpdatePermission}
        deleteSubEntity={removeListItem}
        confirmDeleteSubEntity={true}
        items={exceptionsItems}
        fields={entitiesMetaData.businessHours.membersTableFields['exceptions']}
        defaultSorted={[{ id: 'date', desc: true }]}
        fetching={businessHoursFetching && !exceptionsItems.length}
        itemApiPending={itemApiPending}
      />
    </Wrapper>
  );
}

BusinessHoursDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  children: PropTypes.any,
  businessHoursFetching: PropTypes.bool,
  exceptionsItems: PropTypes.array,
  exceptionsFields: PropTypes.array,
  removeListItem: PropTypes.func,
  itemApiPending: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func
};
