/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Modal } from 'cx-ui-components';
import Confirmation from '../ConfirmationDialog';

import SidePanel from '../../containers/SidePanel';
import EntityTableContainer from '../EntityTable';

// Forms
import CreateListForm from '../Form/Lists/Create';
import UpdateListForm from '../Form/Lists/Update';
import UpdateListItemForm from '../Form/ListItems/Update';
import CreateListItemForm from '../Form/ListItems/Create';
import EmailTemplatesForm from '../Form/EmailTemplates';
import OutboundIdentifiersForm from '../Form/OutboundIdentifiers';
import GenericBulkActionsForm from '../Form/Bulk';
import OutboundIdentifierListsForm from '../Form/OutboundIdentifierLists';
import CustomMetricsForm from '../Form/CustomMetrics';
import ChatWidgetsForm from '../Form/ChatWidgets';
import RolesForm from '../Form/Roles';
//hygen-inject-before3

// AddMembersToList table modal
import AddMembersToList from '../AddMembersToList';

// Side Panels
import ListsDetailsPanel from '../SidePanelDetails/Lists';
import EmailTemplatesDetailsPanel from '../SidePanelDetails/EmailTemplates';
import OutboundIdentifiersDetailsPanel from '../SidePanelDetails/OutboundIdentifiers';
import OutboundIdentifierListsPanelContainer from '../SidePanelDetails/OutboundIdentifierLists';
import CustomMetricsDetailsPanel from '../SidePanelDetails/CustomMetrics';
import ChatWidgetsDetailsPanel from '../SidePanelDetails/ChatWidgets';
import RolesDetailsPanel from '../SidePanelDetails/Roles';
//hygen-inject-before4

const Wrapper = styled.div`
  height: 100vh;
  display: grid;

  ${props =>
    props.isSidePanelOpen
      ? `
    grid-template-columns: 1fr 550px;
    grid-template-areas:
      "table sidePanel";
  `
      : `
    grid-template-columns: 1fr;
    grid-template-areas:
      "table";
  `};
`;

const Table = styled(EntityTableContainer)`
  grid-area: table;
`;

const DetailsPanel = styled.div`
  position: relative;
  padding: 10px 14px;
  overflow-y: auto;
`;

const NoScrollDetailsPanel = styled.div`
  position: relative;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
`;

const createFormRoutes = [
  {
    path: '/configuration/lists',
    component: () => (
      <DetailsPanel>
        <CreateListForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifiers',
    component: () => (
      <DetailsPanel>
        <OutboundIdentifiersForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifierLists',
    component: () => (
      <DetailsPanel>
        <OutboundIdentifierListsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/chatWidgets',
    component: () => (
      <DetailsPanel>
        <ChatWidgetsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/roles',
    component: () => (
      <DetailsPanel>
        <RolesForm />
      </DetailsPanel>
    )
  }
  //hygen-inject-before1
];

const detailsPanelRoutes = [
  {
    path: '/configuration/lists',
    component: () => (
      <DetailsPanel>
        <ListsDetailsPanel>
          <UpdateListForm />
        </ListsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/emailTemplates',
    component: () => (
      <NoScrollDetailsPanel>
        <EmailTemplatesDetailsPanel>
          <EmailTemplatesForm />
        </EmailTemplatesDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifiers',
    component: () => (
      <NoScrollDetailsPanel>
        <OutboundIdentifiersDetailsPanel>
          <OutboundIdentifiersForm />
        </OutboundIdentifiersDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifierLists',
    component: () => (
      <DetailsPanel>
        <OutboundIdentifierListsPanelContainer>
          <OutboundIdentifierListsForm />
        </OutboundIdentifierListsPanelContainer>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/customMetrics',
    component: () => (
      <NoScrollDetailsPanel>
        <CustomMetricsDetailsPanel>
          <CustomMetricsForm />
        </CustomMetricsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/chatWidgets',
    component: () => (
      <DetailsPanel>
        <ChatWidgetsDetailsPanel>
          <ChatWidgetsForm />
        </ChatWidgetsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/roles',
    component: () => (
      <NoScrollDetailsPanel>
        <RolesDetailsPanel>
          <RolesForm />
        </RolesDetailsPanel>
      </NoScrollDetailsPanel>
    )
  }
  //hygen-inject-before2
];

const bulkChangeFormRoutes = [
  {
    path: '/configuration/lists',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifiers',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/outboundIdentifierLists',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  }
  //hygen-inject-before3
];

const createSubEntityFormRoutes = [
  {
    path: '/configuration/lists',
    component: CreateListItemForm
  }
];

const updateSubEntityFormRoutes = [
  {
    path: '/configuration/lists',
    component: UpdateListItemForm
  },
  {
    path: '/configuration/outboundIdentifierLists',
    component: AddMembersToList
  },
  {
    path: '/configuration/roles',
    component: AddMembersToList
  }
];

export default class CrudEndpointUiLayout extends Component {
  componentDidMount() {
    const entityName = this.props.match.params.entityName;
    this.props.setCurrentEntity(entityName);
    this.props.fetchData(entityName);
  }

  render() {
    return (
      <Wrapper isSidePanelOpen={this.props.selectedEntityId !== ''}>
        <Table />
        {this.props.selectedEntityId && (
          <SidePanel>
            {this.props.selectedEntityId === 'create' &&
              createFormRoutes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
              ))}
            {this.props.selectedEntityId === 'bulk' &&
              bulkChangeFormRoutes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
              ))}
            {this.props.selectedEntityId !== 'create' &&
              this.props.selectedEntityId !== 'bulk' &&
              detailsPanelRoutes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
              ))}
          </SidePanel>
        )}
        {this.props.selectedSubEntityId && (
          <Modal selectedSubEntityId={this.props.selectedSubEntityId} onMaskClick={this.props.setSelectedSubEntityId}>
            {this.props.selectedSubEntityId === 'create'
              ? createSubEntityFormRoutes.map((route, index) => (
                  <Route key={index} path={route.path} component={route.component} />
                ))
              : updateSubEntityFormRoutes.map((route, index) => (
                  <Route key={index} path={route.path} component={route.component} />
                ))}
          </Modal>
        )}

        {this.props.showConfirmationDialog && <Confirmation />}
      </Wrapper>
    );
  }
}

CrudEndpointUiLayout.propTypes = {
  setCurrentEntity: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedEntityId: PropTypes.string,
  selectedSubEntityId: PropTypes.string,
  showConfirmationDialog: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func
};
