/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * IntegrationsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Detail, DetailHeader, SelectField } from 'cx-ui-components';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';

import DefaultForm from './Types/default';
import BirstForm from './Types/birst';
import CalabrioForm from './Types/calabrio';
import ClientForm from './Types/client';
import EmailForm from './Types/email';
import LambdaForm from './Types/lambda';
import MonetForm from './Types/monet';
import RestForm from './Types/rest';
import SalesforceForm from './Types/salesforce';
import SerenovaVoiceForm from './Types/serenovaVoice';
import TeleoptiForm from './Types/teleopti';
import TwilioForm from './Types/twilio';
import VerintForm from './Types/verint';
import ZendeskForm from './Types/zendesk';

export default function IntegrationsForm({
  initialValues,
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  integrationType,
  regions,
  authType,
  ctiEnabled,
  rtaEnabled,
  workItems,
  key
}) {
  const formTypeProps = { isSaving, inherited, userHasUpdatePermission, initialValues };
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      {initialValues.get('id') !== undefined ? (
        <Detail
          label="Type"
          value={`${integrationType === 'rest' ? 'REST' : capitalizeFirstLetter(integrationType)}`}
        />
      ) : (
        <SelectField
          name="type"
          label="Type *"
          disabled={isSaving || inherited || !userHasUpdatePermission}
          options={[
            { label: 'REST', value: 'rest' },
            { label: 'Salesforce', value: 'salesforce' },
            { label: 'Zendesk', value: 'zendesk' },
            { label: 'Calabrio', value: 'calabrio' }
          ]}
          data-automation="integrationsType"
          required
        />
      )}
      <DefaultForm {...formTypeProps} />
      {integrationType === 'birst' && <BirstForm {...formTypeProps} />}
      {integrationType === 'calabrio' && (
        <CalabrioForm {...formTypeProps} ctiEnabled={ctiEnabled} rtaEnabled={rtaEnabled} />
      )}
      {integrationType === 'client' && <ClientForm {...formTypeProps} />}
      {integrationType === 'email' && <EmailForm {...formTypeProps} />}
      {integrationType === 'lambda' && <LambdaForm {...formTypeProps} />}
      {integrationType === 'monet' && <MonetForm {...formTypeProps} />}
      {integrationType === 'rest' && <RestForm {...formTypeProps} authType={authType} />}
      {integrationType === 'salesforce' && <SalesforceForm {...formTypeProps} />}
      {integrationType === 'serenovaVoice' && <SerenovaVoiceForm {...formTypeProps} />}
      {integrationType === 'teleopti' && <TeleoptiForm {...formTypeProps} />}
      {integrationType === 'twilio' && <TwilioForm {...formTypeProps} regions={regions} />}
      {integrationType === 'verint' && <VerintForm {...formTypeProps} />}
      {integrationType === 'zendesk' && <ZendeskForm {...formTypeProps} workItems={workItems} />}
    </form>
  );
}

IntegrationsForm.propTypes = {
  key: PropTypes.string,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  integrationType: PropTypes.string,
  authType: PropTypes.string,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  ctiEnabled: PropTypes.bool,
  rtaEnabled: PropTypes.bool,
  workItems: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool
};

IntegrationsForm.defaultProps = {
  integrationType: 'rest',
  authType: 'noAuth',
  ctiEnabled: false,
  rtaEnabled: false,
  workItems: false
};
