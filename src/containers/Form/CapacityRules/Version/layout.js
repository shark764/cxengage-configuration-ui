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
import {
  CapacityRuleField,
  CapacityRuleSliderField,
  SidePanelActions,
  InputField,
  SelectField,
  CloseIconSVG,
} from 'cx-ui-components';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 30px;
  color: #474747;
  font-weight: 700;
  display: inline-block;
`;

const CloseButtonWrapper = styled.div`
  float: right;
`;

const Wrapper = styled.div`
  min-height: 300px;
  max-height: 50vh;
  overflow: ${(props) => (props.ruleQuantifier === 'percentage' ? 'inherit' : 'auto')};
  margin-bottom: 10px;
`;

const CapacityRuleSliderFieldWrapper = styled.div`
  padding-top: 10px;
`;

export default function VersionForm({
  handleSubmit,
  key,
  isSaving,
  onCancel,
  invalid,
  disabled,
  ruleQuantifier,
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
      {disabled && (
        <CloseButtonWrapper>
          <CloseIconSVG onClick={onCancel} size={18} closeIconType="secondary" data-automation="dtpanelActionClose" />
        </CloseButtonWrapper>
      )}
      <Wrapper ruleQuantifier={ruleQuantifier}>
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
              label: formatMessage({
                id: 'capacityRules.version.quantifier.all',
                defaultMessage: 'All',
              }),
              value: 'all',
            },
            {
              label: formatMessage({
                id: 'capacityRules.version.quantifier.any',
                defaultMessage: 'Any',
              }),
              value: 'any',
            },
            {
              label: formatMessage({
                id: 'capacityRules.version.quantifier.percentage',
                defaultMessage: 'Percentage',
              }),
              value: 'percentage',
            },
          ]}
          disabled={isSaving || disabled}
        />
        {ruleQuantifier !== 'percentage' ? (
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
        ) : (
          <>
            <CapacityRuleSliderFieldWrapper>
              <CapacityRuleSliderField
                name="rules"
                min={0}
                max={100}
                handleLabel
                step={1}
                textFormatter={(v) => `${v}%`}
                disabled={isSaving || disabled}
                tooltip
                sliderTooltip="Percentage of the agent's capacity each interaction of this channel type will occupy"
                sliderTooltipProps={{ background: '#6F6F6F', fontColor: '#F5F5F5', width: '250px' }}
                maxChannelDropdownTooltip="Maximum number of interactions of this channel type"
                maxChannelDropdownTooltipProps={{ background: '#6F6F6F', fontColor: '#F5F5F5', width: '250px' }}
              />
            </CapacityRuleSliderFieldWrapper>
          </>
        )}
      </Wrapper>
      <SidePanelActions
        onCancel={onCancel}
        hideCancel={disabled}
        hideSubmit={disabled}
        isSaving={isSaving}
        invalid={invalid || disabled}
      />
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
  ruleQuantifier: PropTypes.string,
  intl: PropTypes.object.isRequired,
};
