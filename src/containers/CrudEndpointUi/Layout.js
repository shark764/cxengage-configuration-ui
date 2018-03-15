/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Modal } from 'cx-ui-components';

import EntityTableContainer from '../EntityTable';
import SidePanelHeaderContainer from '../SidePanelHeader';
import CreateListForm from '../Form/Lists/Create';
import ListsDetailsPanelContainer from '../SidePanelDetails/Lists/Layout';
import CreateListItemForm from '../Form/ListItems/Create';
import SidePanelActionsContainer from '../SidePanelActions';

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

const SidePanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: sidePanel;
  border-left: 1px solid #dadada;
  overflow-y: auto;
`;

const SidePanelHeader = styled(SidePanelHeaderContainer)`
  padding: 10px 14px;
  border-bottom: 1px solid #dadada;
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

const SidePanelActions = styled(SidePanelActionsContainer)`
  margin-top: auto;
  border-top: 1px solid #dadada;
`;

const createFormRoutes = [
  {
    path: '/lists',
    component: () => DetailsPanel(CreateListForm)
  }
];

const detailsPanelRoutes = [
  {
    path: '/lists',
    component: () => DetailsPanel(ListsDetailsPanelContainer)
  }
];

const createSubEntityFormRoutes = [
  {
    path: '/lists',
    component: () => <CreateListItemForm />
  }
];

export default class CrudEndpointUiLayout extends Component {
  componentDidMount() {
    const entityName = this.props.location.pathname.slice(1);

    this.props.setCurrentEntity(entityName);
    this.props.fetchData(entityName);
  }

  render() {
    return (
      <Wrapper isSidePanelOpen={this.props.selectedEntityId !== ''}>
        <Table />
        {this.props.selectedEntityId && (
          <SidePanel>
            <SidePanelHeader />
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
            <SidePanelActions />
          </SidePanel>
        )}
        {this.props.isCreatingSubEntity && (
          <Modal>
            {createSubEntityFormRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
          </Modal>
        )}
      </Wrapper>
    );
  }
}

CrudEndpointUiLayout.propTypes = {
  setCurrentEntity: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedEntityId: PropTypes.string
};
