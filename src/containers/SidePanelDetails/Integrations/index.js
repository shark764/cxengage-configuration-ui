/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import IntegrationsDetailsPanel from './layout';
import {
  isInherited,
  userHasUpdatePermission,
  isEntityFetching,
  itemApiPending
} from '../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId } from '../../../redux/modules/entities';
import { selectIntegrationListeners } from '../../../redux/modules/entities/integrations/selectors';
import { getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

export function mapStateToProps(state) {
  return {
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    integrationsFetching: isEntityFetching(state, 'integrations'),
    listenersItems: selectIntegrationListeners(state),
    listenersFields: entitiesMetaData.integrations.membersTableFields.listeners,
    integrationType: getCurrentFormValueByFieldName(state, 'type'),
    itemApiPending: itemApiPending(state)
  };
}

export const actions = { setSelectedSubEntityId };

export default connect(mapStateToProps, actions)(IntegrationsDetailsPanel);
