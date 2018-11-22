/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import DataAccessReportsForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';
import {
  getReportTypeFormValue,
  getRealtimeReportTypeFormValue
} from '../../../redux/modules/entities/dataAccessReports/selectors';
import {
  selectDashboards
  // selectStandardDashboards
} from '../../../redux/modules/entities/dashboards/selectors';
import { selectHistoricalReportFolders } from '../../../redux/modules/entities/historicalReportFolders/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

const CreateDataAccessReportsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(DataAccessReportsForm);

export function mapStateToProps(state) {
  return {
    reportType: getReportTypeFormValue(state),
    realtimeReportType: getRealtimeReportTypeFormValue(state),
    standardReports: entitiesMetaData['dataAccessReports'].standardReports,
    // standardReports: selectStandardDashboards(state),
    dashboards: selectDashboards(state),
    folders: selectHistoricalReportFolders(state),
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),

    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(CreateDataAccessReportsForm);
