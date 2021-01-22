/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * CapacityRulesForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField } from 'cx-ui-components';

export default function CapacityRulesForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  initialValues,
  versions,
  intl: { formatMessage },
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader
        text={formatMessage({
          id: 'userProfile.details',
          defaultMessage: 'Details',
        })}
      />
      <InputField
        name="name"
        label={`${formatMessage({
          id: 'identityProviders.details.name',
          defaultMessage: 'Name',
        })} *`}
        componentType="input"
        inputType="text"
        placeholder={formatMessage({
          id: 'identityProviders.details.name',
          defaultMessage: 'Name',
        })}
        data-automation="CapacityRulesFormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      {initialValues.get('id') && (
        <SelectField
          name="activeVersion"
          label={`${formatMessage({
            id: 'capacityRules.details.version',
            defaultMessage: 'Version',
          })}`}
          disabled={isSaving || inherited || !userHasUpdatePermission || !versions.length}
          data-automation="CapacityRulesFormFieldActiveVersion"
          options={
            versions &&
            versions.map(({ numericOrderVersion, name, version }) => ({
              label: `${numericOrderVersion} - ${name}`,
              value: version,
            }))
          }
          placeholder={formatMessage({
            id: 'capacityRules.details.version.placeholder',
            defaultMessage: 'Select a version',
          })}
        />
      )}
    </form>
  );
}

CapacityRulesForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  versions: PropTypes.array,
  initialValues: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};
