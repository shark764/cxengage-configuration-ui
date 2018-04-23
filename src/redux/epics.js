import { combineEpics } from 'redux-observable';
import * as entitiesEpics from './modules/entities/epics';
import * as columnFiltersEpics from './modules/columnFilterMenus/epics';
import * as interactionMonitoringEpics from './modules/reporting/interactionMonitoring/epics';
import * as supervisorToolbarEpics from './modules/supervisorToolbar/epics';
import * as userDataEpics from './modules/userData/epics';
import * as emailTemplatesEpics from './modules/emailTemplates/epics';

export const rootEpic = combineEpics(
  ...Object.values(interactionMonitoringEpics),
  ...Object.values(entitiesEpics),
  ...Object.values(columnFiltersEpics),
  ...Object.values(supervisorToolbarEpics),
  ...Object.values(userDataEpics),
  ...Object.values(emailTemplatesEpics)
);
