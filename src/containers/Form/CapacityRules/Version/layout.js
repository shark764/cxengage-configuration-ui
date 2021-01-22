/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ExceptionsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CapacityRuleField, SidePanelActions, InputField, SelectField } from 'cx-ui-components';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;

const Wrapper = styled.div`
  min-height: 300px;
  max-height: 50vh;
  overflow: auto;
  margin-bottom: 10px;
`;

export default function VersionForm({
  handleSubmit,
  key,
  isSaving,
  onCancel,
  invalid,
  disabled,
  intl: { formatMessage },
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Header>
        {!disabled ? (
          <FormattedMessage id="capacityRules.versions.header.new" defaultMessage="Create a new version" />
        ) : (
          <FormattedMessage id="capacityRules.versions.header.publised" defaultMessage="Viewing a published version" />
        )}
      </Header>
      <Wrapper>
        <InputField
          name="name"
          label={`${formatMessage({
            id: 'identityProviders.details.name',
            defaultMessage: 'Name',
          })} *`}
          disabled={isSaving || disabled}
        />
        <SelectField
          name="quantifier"
          label={`${formatMessage({
            id: 'capacityRules.versions.ruleType',
            defaultMessage: 'Rule Type',
          })} *`}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Any',
              value: 'any',
            },
          ]}
          disabled={isSaving || disabled}
        />
        <CapacityRuleField
          name="rule"
          options={[
            {
              label: formatMessage({
                id: 'capacityRules.versions.channels.voice',
                defaultMessage: 'Voice',
              }),
              value: 'voice',
            },
            {
              label: formatMessage({
                id: 'capacityRules.versions.channels.sms',
                defaultMessage: 'SMS',
              }),
              value: 'sms',
            },
            {
              label: formatMessage({
                id: 'capacityRules.versions.channels.email',
                defaultMessage: 'Email',
              }),
              value: 'email',
            },
            {
              label: formatMessage({
                id: 'capacityRules.versions.channels.messaging',
                defaultMessage: 'Messaging',
              }),
              value: 'messaging',
            },
            {
              label: formatMessage({
                id: 'capacityRules.versions.channels.workItem',
                defaultMessage: 'Work Item',
              }),
              value: 'work-item',
            },
          ]}
          disabled={isSaving || disabled}
          messages={{
            selectPlaceholder: formatMessage({
              id: 'capacityRules.versions.channelPicker.placeholder',
              defaultMessage: 'Please select an option',
            }),
            numInteractionsLabel: formatMessage({
              id: 'capacityRules.versions.numInteractions.label',
              defaultMessage: 'Interactions',
            }),
            numInteractionsPlaceholder: formatMessage({
              id: 'capacityRules.versions.numInteractions.placeholder',
              defaultMessage: 'Enter a number',
            }),
            addGroupPopover: formatMessage({
              id: 'capacityRules.versions.addGroup',
              defaultMessage: 'Add Group',
            }),
            removeGroup: formatMessage({
              id: 'capacityRules.versions.removeGroup',
              defaultMessage: 'Remove Group',
            }),
            removeItem: formatMessage({
              id: 'capacityRules.versions.removeItem',
              defaultMessage: 'Remove Item',
            }),
          }}
        />
      </Wrapper>
      <SidePanelActions onCancel={onCancel} isSaving={isSaving} invalid={invalid || disabled} />
    </form>
  );
}

VersionForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};
