/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IntegrationsDetailsPanel
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SidePanelTable, DetailHeader } from 'cx-ui-components';
import { detailHeaderText } from '../../../utils';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function IntegrationsDetailsPanel({
  children,
  inherited,
  userHasUpdatePermission,
  integrationType,
  integrationsFetching,
  listenersItems,
  listenersFields,
  setSelectedSubEntityId,
  itemApiPending,
  globalDialParamsItems,
  removeTwilioGlobalDialParam,
  updateTwilioGlobalDialParam,
  sidePanelUpdatePermissions
}) {
  return (
    <Wrapper className="dtpanel-entity-integrations">
      {children}
      {(integrationType === 'facebook' || integrationType === 'email' || integrationType === 'salesforce') && (
        <Fragment>
          <DetailHeader
            userHasUpdatePermission={!integrationsFetching && !inherited && userHasUpdatePermission}
            text={detailHeaderText(listenersItems, 'Listener(s)')}
            onActionButtonClick={() => setSelectedSubEntityId('listeners')}
            inherited={inherited}
            open
          />
          <SidePanelTable
            tableType={'sidePanel'}
            contains="listeners"
            userHasUpdatePermission={userHasUpdatePermission}
            updateSubEntity={(listItemId, row, subEntityName) => setSelectedSubEntityId(listItemId)}
            items={listenersItems}
            fields={listenersFields}
            fetching={integrationsFetching && !listenersItems.length}
            itemApiPending={itemApiPending}
          />
        </Fragment>
      )}
      {integrationType === 'twilio' && (
        <Fragment>
          <DetailHeader
            userHasUpdatePermission={
              !integrationsFetching &&
              !inherited &&
              userHasUpdatePermission &&
              sidePanelUpdatePermissions.twilioGlobalDialParams
            }
            text={`Global Dial Parameters`}
            onActionButtonClick={() => setSelectedSubEntityId('twilioGlobalDialParams')}
            open
          />
          <SidePanelTable
            tableType={'sidePanel'}
            userHasUpdatePermission={userHasUpdatePermission && sidePanelUpdatePermissions.twilioGlobalDialParams}
            deleteSubEntity={item => removeTwilioGlobalDialParam(item)}
            updateSubEntity={item => updateTwilioGlobalDialParam(item)}
            inherited={inherited}
            items={globalDialParamsItems}
            fields={entitiesMetaData.integrations.membersTableFields.globalDialParams}
            fetching={integrationsFetching && !globalDialParamsItems.length}
            itemApiPending={itemApiPending}
          />
        </Fragment>
      )}
    </Wrapper>
  );
}

IntegrationsDetailsPanel.propTypes = {
  userHasUpdatePermission: PropTypes.bool,
  userHasViewPermission: PropTypes.bool,
  inherited: PropTypes.bool,
  children: PropTypes.any,
  integrationType: PropTypes.string,
  integrationsFetching: PropTypes.bool,
  listenersItems: PropTypes.array,
  listenersFields: PropTypes.array,
  itemApiPending: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func,
  globalDialParamsItems: PropTypes.array,
  removeTwilioGlobalDialParam: PropTypes.func,
  updateTwilioGlobalDialParam: PropTypes.func,
  sidePanelUpdatePermissions: PropTypes.object
};
