/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IntegrationListenerForm
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default class IntegrationListenerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listenerType: this.props.initialValues.get('listenerType')
    };
  }

  handleListenerType = e => {
    this.setState({ listenerType: e.target.value });
  };

  render() {
    const { initialValues, isSaving, integrationType } = this.props;
    return (
      <Fragment>
        <DetailHeader text="Properties" />
        {integrationType === 'email' && (
          <Fragment>
            <InputField
              name="properties.email"
              label="Email *"
              componentType="input"
              inputType="text"
              data-automation="integrationsListenersEmail"
              disabled={isSaving}
            />
            <InputField
              name="properties.password"
              label="Password *"
              componentType="input"
              dataType="password"
              inputType="text"
              data-automation="integrationsListenersPassword"
              disabled={isSaving}
              maskValue
            />
          </Fragment>
        )}
        {integrationType === 'facebook' && (
          <Fragment>
            <InputField
              name="properties.pageToken"
              label="Page Token *"
              componentType="input"
              inputType="text"
              data-automation="integrationsListenersPageToken"
              disabled={isSaving}
            />
            <InputField
              name="properties.pageId"
              label="Page ID *"
              componentType="input"
              inputType="text"
              data-automation="integrationsListenersPageId"
              disabled={isSaving}
            />
          </Fragment>
        )}
        {integrationType === 'salesforce' && (
          <Fragment>
            <SelectField
              name="listenerType"
              label="Listener Type"
              placeholder="Select a listener Type..."
              disabled={isSaving || !!initialValues.get('id')}
              data-automation="listenerType"
              options={[
                { label: 'Email to Case', value: 'emailToCase' },
                { label: 'OmniChannel', value: 'omnichannel' }
              ]}
              onChange={this.handleListenerType}
              required
            />
            {(!this.state.listenerType || this.state.listenerType === 'emailToCase') && (
              <Fragment>
                <InputField
                  name="properties.topic"
                  label="Topic *"
                  componentType="input"
                  inputType="text"
                  data-automation="integrationsListenersTopic"
                  disabled={isSaving}
                />
                <InputField
                  name="properties.type"
                  label="Salesforce Object Type *"
                  componentType="input"
                  inputType="text"
                  data-automation="integrationsListenersType"
                  disabled
                />
              </Fragment>
            )}
            {this.state.listenerType === 'omnichannel' && (
              <Fragment>
                <InputField
                  name="properties.routingTopics[0].topic"
                  label="Routing Topic *"
                  componentType="input"
                  inputType="text"
                  data-automation="integrationsListenersRoutingTopic"
                  disabled={isSaving}
                />
                <InputField
                  name="properties.agentWorkTopic"
                  label="Agent Work *"
                  componentType="input"
                  inputType="text"
                  data-automation="integrationsListenersAgentWorkTopic"
                  disabled={isSaving}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

IntegrationListenerForm.propTypes = {
  initialValues: PropTypes.object,
  isSaving: PropTypes.bool,
  integrationType: PropTypes.string
};
