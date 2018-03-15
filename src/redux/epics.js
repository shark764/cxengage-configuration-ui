import { combineEpics } from 'redux-observable';
import * as Epics from './modules/crudEndpoint/epics';

export const rootEpic = combineEpics(...Object.values(Epics));
