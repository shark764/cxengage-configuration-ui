import React, { Component } from 'react';
import styled from 'styled-components';
import store from '../../redux/store';
import PropTypes from 'prop-types';
import { getCurrentTenantId } from '../../redux/modules/userData/selectors';

const Wrapper = styled.div`
  border: none;
  height: 95vh;
`;

const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

export default class Flows extends Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    removeEventListener('message', this.handleMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    let id = this.props.match.params.id;
    if (prevState.id !== undefined && prevState.id !== id) {
      this.resetIframe(id);
    }
  }

  handleMessage = event => {
    let flowId = this.props.match.params.flowId;
    let actionType = this.props.match.params.actionType;
    let id = this.props.match.params.id;
    switch (event.data.message) {
      case 'FlowDesigner.ready':
        let typeId = actionType === 'viewer' ? 'versionId' : 'draftId';
        let sdkParams = {
          message: 'FlowDesigner.start',
          data: {
            apiToken: sessionStorage.getItem('token'),
            apiHostName: `https://${localStorage.getItem('ENV')}-api.cxengagelabs.net`,
            apiVersion: 'v1',
            tenantId: getCurrentTenantId(store.getState()),
            flowId: this.props.match.params.flowId
          }
        };
        sdkParams.data[typeId] = id;
        document.getElementById('designer').contentWindow.postMessage(sdkParams, '*');
        this.setState({ id: id });
        break;
      case 'FlowDesigner.versionPublished':
        this.props.history.push(`/configuration/flows?id=${flowId}`);
        this.props.setSelectedEntityId(flowId);
        this.props.setCurrentEntity('flows');
        break;
      case 'FlowDesigner.draftPublished':
        let flow = { flowId: event.data.data.flowId, draftId: event.data.data.draftId };
        this.props.openFlowDesigner(flow.flowId, flow, 'drafts');
        break;
    }
  };

  state = {
    random: 0
  };

  resetIframe(id) {
    this.setState({ random: this.state.random + 1, id: id });
  }

  render() {
    return (
      <Wrapper>
        <IFrame
          id="designer"
          key={this.state.random}
          src={'https://' + localStorage.getItem('ENV') + '-designer.cxengagelabs.net'}
        />
      </Wrapper>
    );
  }
}

Flows.propTypes = {
  openFlowDesigner: PropTypes.func,
  setCurrentEntity: PropTypes.func.isRequired,
  setSelectedEntityId: PropTypes.func.isRequired
};
