import React from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField, Detail } from 'cx-ui-components';

import { dateToString } from '../../../../utils/dateUtils';

export default function BusinessHoursV2DraftForm({
  handleSubmit,
  isSaving,
  userHasUpdatePermission,
  timezones,
  initialValues,
  inherited,
  isPublishing
}) {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="name"
        label="Draft Name *"
        componentType="input"
        inputType="text"
        data-automation="BusinessHoursV2DraftFormFieldName"
        disabled={isSaving || inherited || !userHasUpdatePermission || isPublishing}
      />
      <Detail label="Created" value={dateToString(initialValues.get('created'))} />
      <Detail label="Updated" value={dateToString(initialValues.get('updated'))} />
      <InputField
        name="description"
        label="Description"
        componentType="textarea"
        inputType="text"
        data-automation="BusinessHoursV2DraftFormFieldDescription"
        disabled={isSaving || inherited || !userHasUpdatePermission || isPublishing}
      />
      <SelectField
        name="timezone"
        label="Timezone"
        disabled={isSaving || inherited || !userHasUpdatePermission || isPublishing}
        options={timezones.map(({ timezone, offset }) => ({
          label: `(${offset}) ${timezone}`,
          value: timezone
        }))}
        data-automation="BusinessHoursV2DraftTimezoneField"
        required
      />
    </form>
  );
}

BusinessHoursV2DraftForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  timezones: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  isPublishing: PropTypes.bool
};
