/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

/**
 *
 * DataAccessReportsForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DetailHeader, InputField, RadioGroupField, AutoCompleteField } from 'cx-ui-components';
import DetailWrapper from '../../../components/DetailWrapper';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrappedDetailHeader = styled(DetailHeader)`
  margin-left: 35px;
`;

export default function DataAccessReportsForm({
  handleSubmit,
  standardDashboards,
  dashboards,
  folders,
  reportType,
  realtimeReportType,
  isSaving,
  userHasUpdatePermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <Wrapper>
        <DetailWrapper open data-automation="dataAccessReportsDetailsSVG">
          <WrappedDetailHeader text="Details" />
          <InputField
            name="name"
            label="Name *"
            id="frm-data-access-reports-name"
            data-automation="nameInput"
            componentType="input"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
          <InputField
            name="description"
            label="Description"
            id="frm-data-access-reports-description"
            data-automation="descriptionInput"
            componentType="textarea"
            inputType="text"
            disabled={isSaving || !userHasUpdatePermission}
          />
        </DetailWrapper>

        <DetailWrapper open data-automation="dataAccessReportsSVG">
          <WrappedDetailHeader text="Report" />
          <RadioGroupField
            name="reportType"
            data-automation="reportTypeRadio"
            label="Type *"
            id="frm-data-access-reports-report-type"
            disabled={isSaving || !userHasUpdatePermission}
            options={[{ label: 'Realtime', value: 'realtime' }]}
            required
          />
          {reportType === 'realtime' && (
            <Fragment>
              <RadioGroupField
                name="realtimeReportType"
                label="Realtime Report Type *"
                id="frm-data-access-reports-realtime-report-type"
                data-automation="realtimeReportTypeRadio"
                disabled={isSaving || !userHasUpdatePermission}
                options={[{ label: 'Standard', value: 'standard' }, { label: 'Custom', value: 'custom' }]}
                required
              />
              {realtimeReportType && (
                <AutoCompleteField
                  name="realtimeReportName"
                  label="Realtime Report *"
                  data-automation="realtimeReportAutoComplete"
                  placeholder="Search..."
                  suggestions={realtimeReportType === 'custom' ? dashboards : standardDashboards}
                  id="frm-data-access-reports-realtime-report-name"
                  disabled={isSaving || !userHasUpdatePermission}
                />
              )}
            </Fragment>
          )}
        </DetailWrapper>
      </Wrapper>
    </form>
  );
}

DataAccessReportsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  standardDashboards: PropTypes.array,
  dashboards: PropTypes.array,
  folders: PropTypes.array,
  reportType: PropTypes.string,
  realtimeReportType: PropTypes.string
};

DataAccessReportsForm.defaultProps = {
  standardDashboards: [],
  dashboards: [],
  folders: []
};
