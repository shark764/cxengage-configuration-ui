import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'rxjs/add/operator/map';
import { messageSubscribe, messageUnsubscribe } from './windowMessageObservable';
import { localStorageSubscribe, localStorageUnsubscribe } from './localStorageObservable';
import SidePanel from '../../containers/SidePanel';
import AgentStateMonitoringBulkActionsForm from './Bulk';
import AgentStateMonitoringTable from './Table';

const Wrapper = styled.div`
  display: grid;
  ${props =>
    props.isSidePanelOpen
      ? `
    grid-template-columns: 1fr ${props.slidingWidth}px;
    grid-template-areas: "table sidePanel";
  `
      : `
    grid-template-columns: 1fr;
    grid-template-areas: "table";
  `};
`;

const DetailsPanel = styled.div`
  position: relative;
  padding: 10px 14px;
  overflow-y: auto;
`;

export default class AgentStateMonitoring extends Component {
  componentWillMount() {
    messageSubscribe();
    localStorageSubscribe();
    this.props.setCurrentEntity('agentStateMonitoring');
    this.props.fetchData('groups', 'agentStateMonitoring');
    this.props.fetchData('skills', 'agentStateMonitoring');
    this.props.fetchData('reasonLists', 'agentStateMonitoring');
    this.props.startAgentStateMonitoring();
  }

  componentWillUnmount() {
    messageUnsubscribe();
    localStorageUnsubscribe();
  }

  componentDidUpdate(prevProps, nextProps) {
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
      this.props.setSelectedSidePanelId('');
    }
  }

  render() {
    return (
      <Wrapper isSidePanelOpen={this.props.selectedSidePanelId !== ''} slidingWidth={this.props.slidingWidth}>
        <AgentStateMonitoringTable tableType={`agentStateMonitoring`} />

        {this.props.selectedSidePanelId && (
          <SidePanel>
            {this.props.selectedSidePanelId === 'bulk' && (
              <DetailsPanel>
                <AgentStateMonitoringBulkActionsForm />
              </DetailsPanel>
            )}
          </SidePanel>
        )}
      </Wrapper>
    );
  }
}

AgentStateMonitoring.propTypes = {
  setCurrentEntity: PropTypes.func,
  fetchData: PropTypes.func,
  startAgentStateMonitoring: PropTypes.func,
  selectedSidePanelId: PropTypes.string,
  setSelectedSidePanelId: PropTypes.func,
  slidingWidth: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
  bulkSelectedTotal: PropTypes.object
};
