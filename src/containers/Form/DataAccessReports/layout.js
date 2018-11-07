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

export default function DataAccessReportsForm({
  handleSubmit,
  dashboards,
  folders,
  reportType,
  realtimeReportType,
  isSaving,
  inherited,
  userHasUpdatePermission,
  key
}) {
  return (
    <form onSubmit={handleSubmit} key={key}>
      <DetailHeader text="Details" />
      <RadioGroupField
        name="reportType"
        label="Type *"
        id="frm-data-access-reports-report-type"
        disabled={isSaving || inherited || !userHasUpdatePermission}
        options={[
          {
            label: 'Realtime',
            value: 'realtime'
          },
          {
            label: 'Historical',
            value: 'historical'
          }
        ]}
        required
      />
      {reportType === 'realtime' && (
        <Fragment>
          <RadioGroupField
            name="realtimeReportType"
            label="Realtime Report Type *"
            id="frm-data-access-reports-realtime-report-type"
            disabled={isSaving || inherited || !userHasUpdatePermission}
            options={[
              {
                label: 'Standard',
                value: 'standard'
              },
              {
                label: 'Custom',
                value: 'custom'
              }
            ]}
            required
          />
          <AutoCompleteField
            name="realtimeReportName"
            label="Realtime Report *"
            suggestions={
              realtimeReportType === 'custom'
                ? dashboards
                : [
                    'Agent Details',
                    'Agent State',
                    'Interactions Dashboard',
                    'Interactions Completed',
                    'Interactions in Conversation',
                    'Interactions in Queue',
                    'Interactions in IVR',
                    'Overview Dashboard',
                    'Queues Dashboard',
                    'Queue Details',
                    'Resources Dashboard'
                  ]
            }
            id="frm-data-access-reports-realtime-report-name"
            disabled={isSaving || inherited || !userHasUpdatePermission}
          />
        </Fragment>
      )}
      {reportType === 'historical' && (
        <AutoCompleteField
          name="historicalCatalogName"
          label="Folder *"
          suggestions={folders}
          id="frm-data-access-reports-historical-catalog-name"
          disabled={isSaving || inherited || !userHasUpdatePermission}
        />
      )}
      <InputField
        name="name"
        label="Name *"
        id="frm-data-access-reports-name"
        componentType="input"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
      <InputField
        name="description"
        label="Description"
        id="frm-data-access-reports-description"
        componentType="textarea"
        inputType="text"
        disabled={isSaving || inherited || !userHasUpdatePermission}
      />
    </form>
  );
}

DataAccessReportsForm.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  inherited: PropTypes.bool,
  userHasUpdatePermission: PropTypes.bool,
  dashboards: PropTypes.array,
  folders: PropTypes.array,
  reportType: PropTypes.string,
  realtimeReportType: PropTypes.string
};

DataAccessReportsForm.defaultProps = {
  dashboards: [],
  folders: []
};