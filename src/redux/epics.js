import { combineEpics } from 'redux-observable';
import * as brandingEpics from './modules/branding/epics';
import * as crudEndpointEpics from './modules/crudEndpoint/epics';
import * as emailTemplatesEpics from './modules/emailTemplates/epics';

export const rootEpic = combineEpics(
  ...Object.values(crudEndpointEpics),
  ...Object.values(brandingEpics),
  ...Object.values(emailTemplatesEpics)
);
