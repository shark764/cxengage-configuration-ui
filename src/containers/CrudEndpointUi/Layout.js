/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Modal } from 'cx-ui-components';
import Confirmation from '../ConfirmationDialog';

import SidePanel from '../../containers/SidePanel';
import EntityTableContainer from '../EntityTable';
import CreateListForm from '../Form/Lists/Create';
import OutboundIdentifiersForm from '../Form/OutboundIdentifiers';
import ListsDetailsPanelContainer from '../SidePanelDetails/Lists/Layout';
import EmailTemplatesDetailsPanelContainer from '../SidePanelDetails/EmailTemplates/Layout';
import OutboundIdentifiersPanelContainer from '../SidePanelDetails/OutboundIdentifiers/Layout';
import CreateListItemForm from '../Form/ListItems/Create';
import UpdateListItemForm from '../Form/ListItems/Update';

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

function DetailsPanel(ContainerComponent) {
  const DetailsPanelWrapper = styled.div`
    position: relative;
    padding: 10px 14px;
    overflow-y: auto;
  `;
  return (
    <DetailsPanelWrapper>
      <ContainerComponent />
    </DetailsPanelWrapper>
  );
}

function NoScrollDetailsPanel(ContainerComponent) {
  const DetailsPanelWrapper = styled.div`
    position: relative;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
  `;
  return (
    <DetailsPanelWrapper>
      <ContainerComponent />
    </DetailsPanelWrapper>
  );
}

const createFormRoutes = [
  {
    path: '/configuration/lists',
    component: () => DetailsPanel(CreateListForm)
  },
  {
    path: '/configuration/outboundIdentifiers',
    component: () => DetailsPanel(OutboundIdentifiersForm)
  }
];

const detailsPanelRoutes = [
  {
    path: '/configuration/lists',
    component: () => DetailsPanel(ListsDetailsPanelContainer)
  },
  {
    path: '/configuration/emailTemplates',
    component: () => NoScrollDetailsPanel(EmailTemplatesDetailsPanelContainer)
  },
  {
    path: '/configuration/outboundIdentifiers',
    component: () => NoScrollDetailsPanel(OutboundIdentifiersPanelContainer)
  }
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
            {this.props.selectedEntityId === 'create'
              ? createFormRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))
              : detailsPanelRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))}
          </SidePanel>
        )}
        {this.props.selectedSubEntityId && (
          <Modal>
            {this.props.selectedSubEntityId === 'create'
              ? createSubEntityFormRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))
              : updateSubEntityFormRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
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
  showConfirmationDialog: PropTypes.string
};
