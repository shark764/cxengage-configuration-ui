import { combineEpics } from 'redux-observable';
import * as brandingEpics from './modules/entities/branding/epics';
import * as entitiesEpics from './modules/entities/epics';
import * as columnFiltersEpics from './modules/columnFilterMenus/epics';
import * as interactionMonitoringEpics from './modules/reporting/interactionMonitoring/epics';
import * as supervisorToolbarEpics from './modules/supervisorToolbar/epics';
import * as userIdMapEpics from './modules/userIdMap/epics';
import * as emailTemplatesEpics from './modules/entities/emailTemplates/epics';
import * as usersEpics from './modules/entities/users/epics';
import * as dataAccessReportsEpics from './modules/entities/dataAccessReports/epics';
import * as reasonListsEpics from './modules/entities/reasonLists/epics';
import * as flowsEpics from './modules/entities/flows/epics';
import * as dispatchMappingsEpics from './modules/entities/dispatchMappings/epics';
import * as slasEpics from './modules/entities/slas/epics';
import * as rolesEpics from './modules/entities/roles/epics';

export const rootEpic = combineEpics(
  ...Object.values(brandingEpics),
  ...Object.values(interactionMonitoringEpics),
  ...Object.values(entitiesEpics),
  ...Object.values(columnFiltersEpics),
  ...Object.values(supervisorToolbarEpics),
  ...Object.values(userIdMapEpics),
  ...Object.values(emailTemplatesEpics),
  ...Object.values(usersEpics),
  ...Object.values(dataAccessReportsEpics),
  ...Object.values(reasonListsEpics),
  ...Object.values(flowsEpics),
  ...Object.values(dispatchMappingsEpics),
  ...Object.values(slasEpics),
  ...Object.values(rolesEpics)
);
