import { combineEpics } from 'redux-observable';
import * as brandingEpics from './modules/entities/branding/epics';
import * as entitiesEpics from './modules/entities/epics';
import * as columnFiltersEpics from './modules/columnFilterMenus/epics';
import * as interactionMonitoringEpics from './modules/reporting/interactionMonitoring/epics';
import * as supervisorToolbarEpics from './modules/supervisorToolbar/epics';
import * as emailTemplatesEpics from './modules/entities/emailTemplates/epics';

export const rootEpic = combineEpics(
  ...Object.values(brandingEpics),
  ...Object.values(interactionMonitoringEpics),
  ...Object.values(entitiesEpics),
  ...Object.values(columnFiltersEpics),
  ...Object.values(supervisorToolbarEpics),
  ...Object.values(emailTemplatesEpics)
);
