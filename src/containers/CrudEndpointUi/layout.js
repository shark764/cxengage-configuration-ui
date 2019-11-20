/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Modal } from 'cx-ui-components';
import Confirmation from '../ConfirmationDialog';

import CheckboxFilterMenu from '../CheckboxFilterMenu';
import SidePanel from '../../containers/SidePanel';
import EntityTableContainer from '../EntityTable';

// Forms
import CreateListsForm from '../Form/Lists/Create';
import UpdateListsForm from '../Form/Lists/Update';
import UpdateListItemForm from '../Form/ListItems/Update';
import CreateListItemForm from '../Form/ListItems/Create';
import EmailTemplatesForm from '../Form/EmailTemplates';
import OutboundIdentifiersForm from '../Form/OutboundIdentifiers';
import GenericBulkActionsForm from '../Form/Bulk';
import OutboundIdentifierListsForm from '../Form/OutboundIdentifierLists';
import ChatWidgetsForm from '../Form/ChatWidgets';
import RolesForm from '../Form/Roles';
import SkillsForm from '../Form/Skills';
import GroupsForm from '../Form/Groups';
import UsersForm from '../Form/Users';
import UsersBulkActionsForm from '../Form/Users/Bulk';
import UsersCreateForm from '../Form/Users/Create';
import DataAccessReportsForm from '../Form/DataAccessReports';
import ReasonsForm from '../Form/Reasons';
import ReasonListsForm from '../Form/ReasonLists';
import QueuesForm from '../Form/Queues';
import FlowsForm from '../Form/Flows';
import CopyFlowForm from '../Form/Flows/Copy';
import TransferListsForm from '../Form/TransferLists';
import CreateTransferListItemsForm from '../Form/TransferListItems/Create';
import UpdateTransferListItemsForm from '../Form/TransferListItems/Update';
import DispatchMappingsForm from '../Form/DispatchMappings';
import DispositionsForm from '../Form/Dispositions';
import SlasForm from '../Form/Slas';
import InitialSlaVersionForm from '../Form/Slas/Version';
import CreateApiKeyForm from '../Form/ApiKeys/Create';
import UpdateApiKeyForm from '../Form/ApiKeys/Update';
import BusinessHoursForm from '../Form/BusinessHours';
import MessageTemplatesForm from '../Form/MessageTemplates';
import ExceptionsForm from '../Form/BusinessHours/Exception';
import UpdateReasonListItemsForm from '../Form/ReasonListItems/Update';
import CreateReasonListItemForm from '../Form/ReasonListItems/Create';
import ReasonsBulkActionsForm from '../Form/Reasons/Bulk';
import TenantsForm from '../Form/Tenants';
import DispositionListsForm from '../Form/DispositionLists';
//hygen-inject-before3

// AddMembersToList table modal
import AddMembersToList from '../AddMembersToList';
import AddMembersToListEntities from '../AddMembersToList/Entities';

// Side Panels
import ListsDetailsPanel from '../SidePanelDetails/Lists';
import EmailTemplatesDetailsPanel from '../SidePanelDetails/EmailTemplates';
import OutboundIdentifiersDetailsPanel from '../SidePanelDetails/OutboundIdentifiers';
import OutboundIdentifierListsPanelContainer from '../SidePanelDetails/OutboundIdentifierLists';
import ChatWidgetsDetailsPanel from '../SidePanelDetails/ChatWidgets';
import RolesDetailsPanel from '../SidePanelDetails/Roles';
import SkillsDetailsPanel from '../SidePanelDetails/Skills';
import GroupsDetailsPanel from '../SidePanelDetails/Groups';
import UsersDetailsPanel from '../SidePanelDetails/Users';
import DataAccessReportsDetailsPanel from '../SidePanelDetails/DataAccessReports';
import ReasonsDetailsPanel from '../SidePanelDetails/Reasons';
import ReasonListsDetailsPanel from '../SidePanelDetails/ReasonLists';
import QueuesDetailsPanel from '../SidePanelDetails/Queues';
import FlowsDetailsPanel from '../SidePanelDetails/Flows';
import TransferListsDetailsPanel from '../SidePanelDetails/TransferLists';
import DispatchMappingsDetailsPanel from '../SidePanelDetails/DispatchMappings';
import DispositionsDetailsPanel from '../SidePanelDetails/Dispositions';
import SlasDetailsPanel from '../SidePanelDetails/Slas';
import ApiKeysDetailsPanel from '../SidePanelDetails/ApiKeys';
import BusinessHoursDetailsPanel from '../SidePanelDetails/BusinessHours';
import MessageTemplatesDetailsPanel from '../SidePanelDetails/MessageTemplates';
import TenantsDetailsPanel from '../SidePanelDetails/Tenants';
import DispositionListsDetailsPanel from '../SidePanelDetails/DispositionLists';
//hygen-inject-before4

const Wrapper = styled.div`
  height: 100vh;
  display: grid;

  ${props =>
    props.isSidePanelOpen
      ? `
    grid-template-columns: 1fr ${props.slidingWidth}px;
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

const InlineCheckboxFilterMenu = styled(CheckboxFilterMenu)`
  display: inline-block;
  margin-left: 5px;
`;

const createFormRoutes = [
  {
    path: '/configuration/lists',
    component: () => (
      <DetailsPanel>
        <CreateListsForm />
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
  },
  {
    path: '/configuration/skills',
    component: () => (
      <DetailsPanel>
        <SkillsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/groups',
    component: () => (
      <DetailsPanel>
        <GroupsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/users',
    component: () => (
      <DetailsPanel>
        <UsersCreateForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dataAccessReports',
    component: () => (
      <NoScrollDetailsPanel>
        <DataAccessReportsForm />
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/reasons',
    component: () => (
      <DetailsPanel>
        <ReasonsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/reasonLists',
    component: () => (
      <DetailsPanel>
        <ReasonListsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/queues',
    component: () => (
      <DetailsPanel>
        <QueuesForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/flows',
    component: () => (
      <DetailsPanel>
        <FlowsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/transferLists',
    component: () => (
      <DetailsPanel>
        <TransferListsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispatchMappings',
    component: () => (
      <DetailsPanel>
        <DispatchMappingsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispositions',
    component: () => (
      <DetailsPanel>
        <DispositionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/slas',
    component: () => (
      <DetailsPanel>
        <SlasForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/apiKeys',
    component: () => (
      <DetailsPanel>
        <CreateApiKeyForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/businessHours',
    component: () => (
      <DetailsPanel>
        <BusinessHoursForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/messageTemplates',
    component: () => (
      <DetailsPanel>
        <MessageTemplatesForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/tenants',
    component: () => (
      <DetailsPanel>
        <TenantsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispositionLists',
    component: () => (
      <DetailsPanel>
        <DispositionListsForm />
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
          <UpdateListsForm />
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
      <DetailsPanel>
        <OutboundIdentifiersDetailsPanel>
          <OutboundIdentifiersForm />
        </OutboundIdentifiersDetailsPanel>
      </DetailsPanel>
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
      <DetailsPanel>
        <RolesDetailsPanel>
          <RolesForm />
        </RolesDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/skills',
    component: () => (
      <DetailsPanel>
        <SkillsDetailsPanel>
          <SkillsForm />
        </SkillsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/groups',
    component: () => (
      <DetailsPanel>
        <GroupsDetailsPanel>
          <GroupsForm />
        </GroupsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/users',
    component: () => (
      <DetailsPanel>
        <UsersDetailsPanel>
          <UsersForm />
        </UsersDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dataAccessReports',
    component: () => (
      <DetailsPanel>
        <DataAccessReportsDetailsPanel>
          <DataAccessReportsForm />
        </DataAccessReportsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/reasons',
    component: () => (
      <NoScrollDetailsPanel>
        <ReasonsDetailsPanel>
          <ReasonsForm />
        </ReasonsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/reasonLists',
    component: () => (
      <DetailsPanel>
        <ReasonListsDetailsPanel>
          <ReasonListsForm />
        </ReasonListsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/queues',
    component: () => (
      <NoScrollDetailsPanel>
        <QueuesDetailsPanel>
          <QueuesForm />
        </QueuesDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/flows',
    component: () => (
      <DetailsPanel>
        <FlowsDetailsPanel>
          <FlowsForm />
        </FlowsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/transferLists',
    component: () => (
      <DetailsPanel>
        <TransferListsDetailsPanel>
          <TransferListsForm />
        </TransferListsDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispatchMappings',
    component: () => (
      <NoScrollDetailsPanel>
        <DispatchMappingsDetailsPanel>
          <DispatchMappingsForm />
        </DispatchMappingsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/dispositions',
    component: () => (
      <NoScrollDetailsPanel>
        <DispositionsDetailsPanel>
          <DispositionsForm />
        </DispositionsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/slas',
    component: () => (
      <NoScrollDetailsPanel>
        <SlasDetailsPanel>
          <SlasForm />
        </SlasDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/apiKeys',
    component: () => (
      <NoScrollDetailsPanel>
        <ApiKeysDetailsPanel>
          <UpdateApiKeyForm />
        </ApiKeysDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/businessHours',
    component: () => (
      <DetailsPanel>
        <BusinessHoursDetailsPanel>
          <BusinessHoursForm />
        </BusinessHoursDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/messageTemplates',
    component: () => (
      <DetailsPanel>
        <MessageTemplatesDetailsPanel>
          <MessageTemplatesForm />
        </MessageTemplatesDetailsPanel>
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/tenants',
    component: () => (
      <NoScrollDetailsPanel>
        <TenantsDetailsPanel>
          <TenantsForm />
        </TenantsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  },
  {
    path: '/configuration/dispositionLists',
    component: () => (
      <NoScrollDetailsPanel>
        <DispositionListsDetailsPanel>
          <DispositionListsForm />
        </DispositionListsDetailsPanel>
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
  },
  {
    path: '/configuration/chatWidgets',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/users',
    component: () => (
      <DetailsPanel>
        <UsersBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/groups',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/skills',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/businessHours',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/messageTemplates',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/apiKeys',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/flows',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispatchMappings',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/reasons',
    component: () => (
      <DetailsPanel>
        <ReasonsBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/reasonLists',
    component: () => (
      <DetailsPanel>
        <ReasonsBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/transferLists',
    component: () => (
      <DetailsPanel>
        <GenericBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispositionLists',
    component: () => (
      <DetailsPanel>
        <ReasonsBulkActionsForm />
      </DetailsPanel>
    )
  },
  {
    path: '/configuration/dispositions',
    component: () => (
      <DetailsPanel>
        <ReasonsBulkActionsForm />
      </DetailsPanel>
    )
  }
  //hygen-inject-before3
];

const createSubEntityFormRoutes = [
  {
    path: '/configuration/lists',
    component: CreateListItemForm
  },
  {
    path: '/configuration/transferLists',
    component: CreateTransferListItemsForm
  },
  {
    path: '/configuration/businessHours',
    component: ExceptionsForm
  },
  {
    path: '/configuration/reasonLists',
    component: CreateReasonListItemForm
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
  },
  {
    path: '/configuration/skills',
    component: AddMembersToListEntities
  },
  {
    path: '/configuration/groups',
    component: AddMembersToListEntities
  },
  {
    path: '/configuration/users',
    component: AddMembersToListEntities
  },
  {
    path: '/configuration/dataAccessReports',
    component: AddMembersToList
  },
  {
    path: '/configuration/flows',
    component: CopyFlowForm
  },
  {
    path: '/configuration/slas',
    component: InitialSlaVersionForm
  },
  {
    path: '/configuration/transferLists',
    component: UpdateTransferListItemsForm
  },
  {
    path: '/configuration/reasonLists',
    component: UpdateReasonListItemsForm
  }
];

export default class CrudEndpointUiLayout extends Component {
  componentDidMount() {
    const entityName = this.props.match.params.entityName;
    this.props.setCurrentEntity(entityName);
    this.props.fetchData(entityName);
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.entityName !== prevProps.entityName) {
      this.props.setCurrentEntity(this.props.match.params.entityName);
      this.props.fetchData(this.props.match.params.entityName);
    }

    /**
     * If we go from having selected items
     * to no selected items , close the side panel
     */
    if (
      prevProps.bulkSelectedTotal !== undefined &&
      this.props.bulkSelectedTotal !== undefined &&
      prevProps.bulkSelectedTotal.size > 0 &&
      this.props.bulkSelectedTotal.size === 0
    ) {
      this.props.unsetSelectedEntityId();
    }
    if (prevProps.currentTenantId !== this.props.currentTenantId) {
      this.props.fetchData(this.props.match.params.entityName);
    }
  }

  render() {
    return (
      <Wrapper isSidePanelOpen={this.props.selectedEntityId !== ''} slidingWidth={this.props.slidingWidth}>
        <Table tableType={this.props.match.params.entityName} selectedEntityId={this.props.selectedEntityId}>
          <InlineCheckboxFilterMenu
            type="secondary"
            menuType="Columns"
            tableType={this.props.tableType}
            currentVisibleSubMenu={this.props.currentVisibleSubMenu}
            selectionType="checkbox"
            data-automation="entityTableColumnSelectionBtn"
          >
            Columns
          </InlineCheckboxFilterMenu>
        </Table>
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
  bulkSelectedTotal: PropTypes.object,
  tableType: PropTypes.string,
  setSelectedEntityId: PropTypes.func,
  currentVisibleSubMenu: PropTypes.string,
  setCurrentEntity: PropTypes.func.isRequired,
  match: PropTypes.object,
  fetchData: PropTypes.func.isRequired,
  selectedEntityId: PropTypes.string,
  selectedSubEntityId: PropTypes.string,
  unsetSelectedEntityId: PropTypes.func,
  showConfirmationDialog: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func,
  slidingWidth: PropTypes.number,
  entityName: PropTypes.string,
  currentTenantId: PropTypes.string
};
