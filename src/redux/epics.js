import { combineEpics } from 'redux-observable';
import * as brandingEpics from './modules/entities/branding/epics';
import * as entitiesEpics from './modules/entities/epics';
import * as columnFiltersEpics from './modules/columnFilterMenus/epics';
import * as interactionMonitoringEpics from './modules/reporting/interactionMonitoring/epics';
import * as agentStateMonitoringEpics from './modules/reporting/agentStateMonitoring/epics';
import * as supervisorToolbarEpics from './modules/supervisorToolbar/epics';
import * as userIdMapEpics from './modules/userIdMap/epics';
import * as emailTemplatesEpics from './modules/entities/emailTemplates/epics';
import * as usersEpics from './modules/entities/users/epics';
import * as dataAccessReportsEpics from './modules/entities/dataAccessReports/epics';
import * as reasonListsEpics from './modules/entities/reasonLists/epics';
import * as flowsEpics from './modules/entities/flows/epics';
import * as dispatchMappingsEpics from './modules/entities/dispatchMappings/epics';
import * as slasEpics from './modules/entities/slas/epics';
import * as userDataEpics from './modules/userData/epics';
import * as transferListsEpics from './modules/entities/transferLists/epics';
import * as apiKeysEpics from './modules/entities/apiKeys/epics';
import * as businessHoursEpics from './modules/entities/businessHours/epics';
import * as fetchReportingEventsEpics from './modules/entities/reportingEvents/epics';
import * as tenantsEpics from './modules/entities/tenants/epics';
import * as reasonsEpics from './modules/entities/reasons/epics';
import * as dispositionListsEpics from './modules/entities/dispositionLists/epics';
import * as chatWidgetsEpics from './modules/entities/chatWidgets/epics';
import * as BusinessHoursV2Epics from './modules/entities/businessHoursV2/epics';
import * as customAttributesEpics from './modules/entities/customAttributes/epics';
import * as integrationsEpics from './modules/entities/integrations/epics';
import * as contactLayoutsEpics from './modules/entities/contactLayouts/epics';
import * as contactAttributesEpics from './modules/entities/contactAttributes/epics';
import * as forecastDashboardsEpics from './modules/reporting/forecastDashboards/epics';
import * as userProfileEpics from './modules/entities/userProfile/epics';
import * as capacityRulesEpics from './modules/entities/capacityRules/epics';
import * as facebookIntegrationsEpics from './modules/entities/facebookIntegrations/epics';
import * as mediaEpics from './modules/entities/media/epics';

export const rootEpic = combineEpics(
  ...Object.values(brandingEpics),
  ...Object.values(interactionMonitoringEpics),
  ...Object.values(agentStateMonitoringEpics),
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
  ...Object.values(userDataEpics),
  ...Object.values(transferListsEpics),
  ...Object.values(apiKeysEpics),
  ...Object.values(businessHoursEpics),
  ...Object.values(fetchReportingEventsEpics),
  ...Object.values(tenantsEpics),
  ...Object.values(reasonsEpics),
  ...Object.values(dispositionListsEpics),
  ...Object.values(chatWidgetsEpics),
  ...Object.values(BusinessHoursV2Epics),
  ...Object.values(customAttributesEpics),
  ...Object.values(integrationsEpics),
  ...Object.values(contactLayoutsEpics),
  ...Object.values(contactAttributesEpics),
  ...Object.values(forecastDashboardsEpics),
  ...Object.values(userProfileEpics),
  ...Object.values(capacityRulesEpics),
  ...Object.values(facebookIntegrationsEpics),
  ...Object.values(mediaEpics)
);
