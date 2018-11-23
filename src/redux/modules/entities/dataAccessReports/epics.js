import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { clearFields } from 'redux-form';
import { removeLastLetter, camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { entitiesMetaData } from '../metaData';

import { getStandardDashboardByName, getCustomDashboardByName } from '../dashboards/selectors';

export const ClearDataAccessReportsFormFields = action$ =>
  action$
    .ofType('@@redux-form/UNREGISTER_FIELD')
    .filter(a => a.meta.form.includes('dataAccessReports'))
    .filter(
      a =>
        a.payload.name.includes('realtimeReportType') ||
        a.payload.name.includes('realtimeReportId') ||
        a.payload.name.includes('realtimeReportName') ||
        a.payload.name.includes('historicalCatalogName')
    )
    .map(a => clearFields(a.meta.form, false, false, a.payload.name));

export const CreateDataAccessReport = (action$, store) =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dataAccessReports')
    .map(a => {
      a.sdkCall = entitiesMetaData['dataAccessReports'].entityApiRequest('create', 'singleMainEntity');
      const { realtimeReportName, realtimeReportType } = a.values;
      if (realtimeReportType === 'standard') {
        a.values.realtimeReportId = getStandardDashboardByName(store.getState(), realtimeReportName);
      } else if (realtimeReportType === 'custom') {
        a.values.realtimeReportId = getCustomDashboardByName(store.getState(), realtimeReportName);
      } else {
        delete a.values.realtimeReportId;
      }
      a.sdkCall.data = a.values;
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dataAccessReports')} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const UpdateDataAccessReport = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dataAccessReports')
    .map(a => {
      a.sdkCall = entitiesMetaData['dataAccessReports'].entityApiRequest('update', 'singleMainEntity');
      const { realtimeReportName, realtimeReportType } = a.values;
      if (realtimeReportType === 'standard') {
        a.values.realtimeReportId = getStandardDashboardByName(store.getState(), realtimeReportName);
      } else if (realtimeReportType === 'custom') {
        a.values.realtimeReportId = getCustomDashboardByName(store.getState(), realtimeReportName);
      } else {
        delete a.values.realtimeReportId;
      }
      a.sdkCall.data = {
        ...a.values,
        [removeLastLetter('dataAccessReports') + 'Id']: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dataAccessReports')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
