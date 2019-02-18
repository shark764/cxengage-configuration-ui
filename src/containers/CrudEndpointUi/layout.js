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
import CustomMetricsForm from '../Form/CustomMetrics';
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
import DispatchMappingsForm from '../Form/DispatchMappings';
//hygen-inject-before3

// AddMembersToList table modal
import AddMembersToList from '../AddMembersToList';
import AddMembersToListEntities from '../AddMembersToList/Entities';

// Side Panels
import ListsDetailsPanel from '../SidePanelDetails/Lists';
import EmailTemplatesDetailsPanel from '../SidePanelDetails/EmailTemplates';
import OutboundIdentifiersDetailsPanel from '../SidePanelDetails/OutboundIdentifiers';
import OutboundIdentifierListsPanelContainer from '../SidePanelDetails/OutboundIdentifierLists';
import CustomMetricsDetailsPanel from '../SidePanelDetails/CustomMetrics';
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
  }
  ,
  {
    path: '/configuration/dispatchMappings',
    component: () => (
      <DetailsPanel>
        <DispatchMappingsForm />
      </DetailsPanel>
    )
  },
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
    path: '/configuration/customMetrics',
    component: () => (
      <DetailsPanel>
        <CustomMetricsDetailsPanel>
          <CustomMetricsForm />
        </CustomMetricsDetailsPanel>
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
      <NoScrollDetailsPanel>
        <ReasonListsDetailsPanel>
          <ReasonListsForm />
        </ReasonListsDetailsPanel>
      </NoScrollDetailsPanel>
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
      <NoScrollDetailsPanel>
        <TransferListsDetailsPanel>
          <TransferListsForm />
        </TransferListsDetailsPanel>
      </NoScrollDetailsPanel>
    )
  }
  ,
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
  }
];

export default class CrudEndpointUiLayout extends Component {
  componentDidMount() {
    const entityName = this.props.match.params.entityName;
    this.props.setCurrentEntity(entityName);
    this.props.fetchData(entityName);
  }

  componentDidUpdate(prevProps) {
    /**
     * if we go from haveing selected items
     * to no selected items , close the side panel
     */
    if (
      prevProps.bulkSelectedTotal !== undefined &&
      this.props.bulkSelectedTotal !== undefined &&
      prevProps.bulkSelectedTotal.size > 0 &&
      this.props.bulkSelectedTotal.size === 0
    ) {
      this.props.setSelectedEntityId('');
    }
  }

  render() {
    return (
      <Wrapper isSidePanelOpen={this.props.selectedEntityId !== ''} slidingWidth={this.props.slidingWidth}>
        <Table tableType={this.props.match.params.entityName}>
          <InlineCheckboxFilterMenu
            type="secondary"
            menuType="Columns"
            tableType={this.props.tableType}
            currentVisibleSubMenu={this.props.currentVisibleSubMenu}
            selectionType="checkbox"
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
  showConfirmationDialog: PropTypes.string,
  setSelectedSubEntityId: PropTypes.func,
  slidingWidth: PropTypes.number
};
