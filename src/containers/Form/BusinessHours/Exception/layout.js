/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * ExceptionsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField, RadioGroupField, DatepickerField, TimepickerField, SidePanelActions } from 'cx-ui-components';
import styled from 'styled-components';

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

const ExceptionWarning = styled.div`
  color: orangered;
  margin-bottom: 30px;
  display: inline-block;
`;

export default function ExceptionsForm({
  handleSubmit,
  key,
  isSaving,
  isAllDay,
  onCancel,
  invalid,
  exceptionOverlaps
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Fragment>
        <Header>Creating a new exception</Header>
      </Fragment>
      {exceptionOverlaps &&
        !invalid && (
          <ExceptionWarning>
            Warning: There's an exception that overlaps with the one being created right now
          </ExceptionWarning>
        )}
      <Wrapper>
        <DatepickerField
          name="date"
          label="Date *"
          data-automation="exceptionsFormFieldDate"
          minDate={new Date()}
          disabled={isSaving}
        />
        <InputField
          name="description"
          label="Description"
          componentType="textarea"
          inputType="text"
          data-automation="exceptionsFormFieldDescription"
          disabled={isSaving}
        />
        <RadioGroupField
          name="isAllDay"
          label=""
          options={[{ label: 'All Day', value: true }, { label: 'Custom', value: false }]}
          disabled={isSaving}
        />
        {!isAllDay && (
          <Fragment>
            <TimepickerField name="startTimeMinutes" label="Start Time" twelveHoursMode />
            <TimepickerField name="endTimeMinutes" label="End Time" twelveHoursMode />
          </Fragment>
        )}
      </Wrapper>
      <SidePanelActions onCancel={onCancel} isSaving={isSaving} invalid={invalid} />
    </form>
  );
}

ExceptionsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isAllDay: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  invalid: PropTypes.bool,
  exceptionOverlaps: PropTypes.bool
};
