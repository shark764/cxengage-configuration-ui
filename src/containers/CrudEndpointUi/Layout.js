/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { Modal } from 'cx-ui-components';

import SidePanel from '../../components/sidePanel';
import EntityTableContainer from '../EntityTable';
import CreateListForm from '../Form/Lists/Create';
import ListsDetailsPanelContainer from '../SidePanelDetails/Lists/Layout';
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
    component: CreateListItemForm
  }
];

const updateSubEntityFormRoutes = [
  {
    path: '/lists',
    component: UpdateListItemForm
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
      </Wrapper>
    );
  }
}

CrudEndpointUiLayout.propTypes = {
  setCurrentEntity: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  selectedEntityId: PropTypes.string,
  selectedSubEntityId: PropTypes.string
};
