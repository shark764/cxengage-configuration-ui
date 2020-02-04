/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/**
 *
 * BusinessHoursForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, SelectField, RadioGroupField, Timepicker } from 'cx-ui-components';

import styled from 'styled-components';
import { Field } from 'redux-form/immutable';

import DetailWrapper from '../../../components/DetailWrapper';

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  border: #cccccc solid 1px;
  max-width: 510px;
  margin-top: 20px;
  border-spacing: 0;
  border-radius: 0px;
  background-clip: padding-box;
  box-sizing: border-box;
  width: 100%;
  font-size: 0.9em;

  > thead > tr > th {
    border-bottom: #cccccc solid 1px;
  }

  th {
    color: #656565;
    font-weight: 600;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
  }

  td {
    padding: 10px;
    box-sizing: border-box;
  }
`;

const Error = styled.span`
  color: red;
  max-width: 170px;
  display: block;
`;

const Warning = styled.span`
  color: orange;
  max-width: 170px;
  display: block;
`;

const Picker = props => {
  const { input, disabled, twelveHoursMode, hoursStep, minutesStep, nullOption, meta: { error, warning } } = props;
  return (
    <div>
      {input.name.includes('StartTimeMinutes') &&
        ((error && <Error>{error}</Error>) || (warning && <Warning>{warning}</Warning>))}
      <Timepicker
        onChange={minutesOnDay => {
          input.onChange(minutesOnDay);
          input.onBlur();
        }}
        minutesOnDay={input.value}
        disabled={disabled}
        twelveHoursMode={twelveHoursMode}
        hoursStep={hoursStep}
        minutesStep={minutesStep}
        nullOption={nullOption}
        data-automation={props['data-automation']}
      />
    </div>
  );
};

export const TimepickerField = props => <Field {...props} component={Picker} />;

export default function BusinessHoursForm({
  handleSubmit,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key,
  timezones,
  businessHoursType
}) {
  const daysOfTheWeekFields = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map(
    day => {
      const dayInitials = day.substring(0, 3);
      return (
        <tr key={dayInitials}>
          <Fragment>
            <th>{`${day.substr(0, 1).toUpperCase()}${day.substr(1)}`}</th>
            <td>
              <TimepickerField
                name={`${dayInitials}StartTimeMinutes`}
                data-automation={`startTimeMinutes${dayInitials}Picker`}
                disabled={isSaving || inherited || !userHasUpdatePermission}
                twelveHoursMode
                nullOption
              />
            </td>
            <td>
              <TimepickerField
                name={`${dayInitials}EndTimeMinutes`}
                data-automation={`endTimeMinutes${dayInitials}Picker`}
                disabled={isSaving || inherited || !userHasUpdatePermission}
                twelveHoursMode
                nullOption
              />
            </td>
          </Fragment>
        </tr>
      );
    }
  );
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <div>
          <DetailHeader text="Details" />
          <InputField
            name="name"
            label="Name *"
            componentType="input"
            inputType="text"
            data-automation="nameInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <InputField
            name="description"
            label="Description"
            componentType="textarea"
            inputType="text"
            data-automation="descriptionInput"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
          <SelectField
            name="timezone"
            label="Timezone"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            options={timezones.map(({ timezone, offset }) => ({
              label: `(${offset}) ${timezone}`,
              value: timezone
            }))}
            data-automation="timezoneList"
            required
          />
        </div>
        <DetailWrapper open={true} data-automation="regularHoursSVG">
          <WrappedDetailHeader text="Regular Hours" />
          <RadioGroupField
            name="businessHoursType"
            label="Business Hours"
            options={[{ label: '24/7', value: '24/7' }, { label: 'Scheduled Hours', value: 'scheduledHours' }]}
            disabled={isSaving || inherited || !userHasUpdatePermission}
            data-automation="businessHoursTypeChoose"
          />
          {businessHoursType === 'scheduledHours' && (
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>{daysOfTheWeekFields}</tbody>
            </Table>
          )}
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

BusinessHoursForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  timezones: PropTypes.array.isRequired,
  businessHoursType: PropTypes.string
};

Picker.propTypes = {
  input: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  twelveHoursMode: PropTypes.bool,
  hoursStep: PropTypes.number,
  minutesStep: PropTypes.number,
  nullOption: PropTypes.bool,
  meta: PropTypes.object,
  'data-automation': PropTypes.string
};

TimepickerField.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  twelveHoursMode: PropTypes.bool,
  hoursStep: PropTypes.number,
  minutesStep: PropTypes.number,
  nullOption: PropTypes.bool,
  'data-automation': PropTypes.string
};
