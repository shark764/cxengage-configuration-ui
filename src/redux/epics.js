import { combineEpics } from 'redux-observable';
import * as crudEndpointEpics from './modules/crudEndpoint/epics';
import * as brandingEpics from './modules/branding/epics';

export const rootEpic = combineEpics(
  ...Object.values(crudEndpointEpics),
  ...Object.values(brandingEpics)
);
