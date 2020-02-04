import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { setSelectedSubEntityId } from '../index';

import { getCurrentEntity, getSelectedEntityId } from '../selectors';

export const createDraftAfterCreatingBusinessHour = ($action, store) =>
  $action
    .ofType('CREATE_ENTITY_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'businessHoursV2')
    .map(({ entityName, id }) => ({
      type: 'CREATE_SUB_ENTIITY',
      entityName,
      selectedEntity: id,
      subEntityName: 'drafts',
      values: {
        name: 'Initial Draft'
      }
    }));

export const handleFullFilledDraftCreation = ($action, store) =>
  $action
    .ofType('CREATE_SUB_ENTITY_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      id: getSelectedEntityId(store.getState())
    }))
    .filter(a => a.id !== 'create' && a.id !== '' && a.entityName === 'businessHoursV2')
    .map(a => setSelectedSubEntityId(a.response.result.id));
