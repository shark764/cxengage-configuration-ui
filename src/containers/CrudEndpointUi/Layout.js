/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import EntityTableContainer from '../EntityTable';
import SidePanelHeaderContainer from '../SidePanelHeader';
import ListsDetailsPanelContainer from '../SidePanelDetails/Lists';
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

const detailsPanelRoutes = [
  {
    path: '/lists',
    component: () => DetailsPanel(ListsDetailsPanelContainer)
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
            {detailsPanelRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
            <SidePanelActions />
          </SidePanel>
        )}
      </Wrapper>
    );
  }
}

CrudEndpointUiLayout.propTypes = {
  setCurrentEntity: PropTypes.func,
  fetchData: PropTypes.func,
  setSelectedEntityId: PropTypes.func,
  selectedEntityId: PropTypes.string
};
