import 'rxjs/add/operator/race';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { submit, change } from 'redux-form';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';
import moment from 'moment';

import { from } from 'rxjs/observable/from';
import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError, handleBulkSuccess } from '../handleResult';

import { Toast } from 'cx-ui-components';

import {
  getCurrentEntity,
  getSelectedEntity,
  getCurrentSubEntity,
  getSelectedEntityId,
  getSelectedSubEntityId,
  getSelectedSubEntity,
  getSelectedEntityStatus,
  getSelectedEntityBulkChangeItems,
  findEntity,
  isItemInherited,
  getEntityItemDisplay
} from '../selectors';
import { getFormValues } from '../../form/selectors';
import { getAllEntities } from '../../../../containers/EntityTable/selectors';
import { currentTenantId } from '../../userData/selectors';

import {
  fetchActiveVersionBusinessHoursFulfilled,
  createDraftBusinessHoursV2,
  setSelectedBusinessHourVersion
} from '../index';

export const createBusinessHour = $action =>
  $action
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .mergeMap(a => {
      const sdkCall = entitiesMetaData['businessHoursV2'].entityApiRequest('create', 'singleMainEntity');

      return fromPromise(
        sdkPromise({
          ...sdkCall,
          path: ['business-hours'],
          data: a.values,
          apiVersion: 'v2'
        })
      )
        .mergeMap(response => [
          handleSuccess(response, a),
          createDraftBusinessHoursV2(response.result.id, {
            draftName: 'Initial Draft'
          })
        ])
        .catch(error => handleError(error, a));
    });

export const createDraft = ($action, store) =>
  $action
    .ofType('CREATE_DRAFT_BUSINESS_HOURS_V2')
    .map(a => ({
      ...a,
      selectedEntityId: getSelectedEntityId(store.getState()),
      sdkCall: {
        path: ['business-hours', a.businessHourId, 'drafts'],
        data: {
          name: a.values.draftName,
          ...(a.values.description != null && {
            description: a.values.description
          }),
          ...(a.values.timezone && { timezone: a.values.timezone }),
          ...(a.values.rules && {
            rules: a.values.rules.map(({ description, on, on: { type, value } = {}, repeats, ...rule }) => ({
              ...rule,
              ...(description != null && { description }),
              ...(on && value && value === 'day'
                ? {
                    on: {
                      type: value,
                      value: type
                    }
                  }
                : on ? { on } : {}),
              ...(repeats && repeats !== 'none' && { repeats })
            }))
          })
        },
        apiVersion: 'v2',
        command: 'createBusinessHourV2Draft',
        module: 'entities',
        crudAction: 'create',
        topic: 'cxengage/entities/create-business-hours-v2-draft'
      }
    }))
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            a.selectedEntityId
              ? '<i>Draft</i> has been created sucessfully'
              : '<i>Business Hour</i> has been created sucessfully'
          )
        )
        .catch(error => handleError(error, a))
    );

export const fetchActiveVersion = ($action, store) =>
  $action
    .ofType('FETCH_DATA_FULFILLED')
    .map(a => ({
      ...a,
      currentEntity: getCurrentEntity(store.getState()),
      businessHours: getAllEntities(store.getState())
    }))
    .filter(
      ({ entityName, currentEntity, businessHours }) =>
        entityName === 'businessHoursV2' && currentEntity === entityName && businessHours
    )
    .mergeMap(({ businessHours }) =>
      forkJoin(
        businessHours.filter(({ activeVersion }) => activeVersion).map(({ activeVersion, id }) => {
          const sdkCall = {
            path: ['business-hours', id, 'versions', activeVersion],
            apiVersion: 'v2',
            command: 'getBusinessHourV2Version',
            module: 'entities',
            crudAction: 'read',
            topic: 'cxengage/entities/read-business-hours-v2-version'
          };

          return fromPromise(sdkPromise(sdkCall)).catch(error =>
            handleError(
              error,
              {
                type: 'FETCH_VERSION_BUSINESS_HOURS',
                entityName: 'businessHoursV2'
              },
              'An active version for selected business hour could not be retrieved'
            )
          );
        })
      )
    )
    .map(responses => {
      const businessHours = getAllEntities(store.getState());
      const activeVersionsObject = responses.filter(({ result }) => result).reduce((result, response) => {
        const { id: activeVersionId } = response.result;
        const businessHourId = businessHours.find(({ activeVersion }) => activeVersion === activeVersionId).id;
        return {
          ...result,
          [businessHourId]: response.result
        };
      }, {});
      return fetchActiveVersionBusinessHoursFulfilled(activeVersionsObject);
    });

export const fetchVersionsAndDrafts = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID', 'CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      businessHours: getAllEntities(store.getState())
    }))
    .filter(
      ({ entityId, entityName, businessHours, businessHourId, selectedEntityId, type }) =>
        (type === 'SET_SELECTED_ENTITY_ID' &&
          entityName === 'businessHoursV2' &&
          businessHours &&
          entityId &&
          entityId !== '' &&
          entityId !== 'create') ||
        (type === 'CREATE_DRAFT_BUSINESS_HOURS_V2_FULFILLED' && businessHourId !== selectedEntityId && selectedEntityId)
    )
    .mergeMap(({ entityId, businessHourId }) => {
      const apis = ['versions', 'drafts'];
      const id = entityId || businessHourId;
      return forkJoin(
        apis.map(api => {
          const sdkCall = {
            path: ['business-hours', id, api],
            apiVersion: 'v2',
            command: `getBusinessHourV2${capitalizeFirstLetter(api)}`,
            module: 'entities',
            crudAction: 'read',
            topic: `cxengage/entities/read-business-hours-v2-${api}`
          };

          return fromPromise(sdkPromise(sdkCall)).catch(error =>
            handleError(
              error,
              {
                type: `FETCH_${api.toUpperCase()}_BUSINESS_HOURS`,
                entityName: 'businessHoursV2'
              },
              `${capitalizeFirstLetter(api)} for a business hour couldn't be retrieved`
            )
          );
        })
      );
    })
    .mergeMap(responses => {
      const selectedBusinessHour = getSelectedEntity(store.getState());
      return responses.every(({ result }) => !result)
        ? responses
        : [
            {
              type: 'SET_BUSINESS_HOUR_VERSIONS_AND_DRAFTS',
              versions: responses[0].result || [],
              drafts: responses[1].result || []
            },
            ...(!responses[0].result ? [responses[0]] : []),
            ...(!responses[1].result ? [responses[1]] : []),
            ...(selectedBusinessHour && selectedBusinessHour.get('activeVersion') && responses[0].result
              ? [setSelectedBusinessHourVersion(selectedBusinessHour.get('activeVersion'))]
              : [])
          ];
    });

export const UpdateDraft = (action$, store) =>
  action$
    .ofType('UPDATE_SUB_ENTITY')
    .map(action => ({
      ...action,
      subEntityId: getSelectedSubEntityId(store.getState()),
      entityName: getCurrentEntity(store.getState()),
      subEntityName: getCurrentSubEntity(store.getState()),
      entityId: getSelectedEntityId(store.getState()),
      values: {
        ...action.values,
        ...(action.values.rules
          ? getFormValues(store.getState(), 'draft:edit', 'name', 'description', 'timezone')
          : {
              rules:
                getFormValues(store.getState(), 'businessHoursV2:rules', 'rules') &&
                getFormValues(store.getState(), 'businessHoursV2:rules', 'rules').toJS()
            })
      }
    }))
    .filter(({ entityName, subEntityName }) => entityName === 'businessHoursV2' && subEntityName === 'drafts')
    .map(a => {
      const { subEntityId: draftId, entityId: id, values: { name, description, timezone } } = a;

      const rules =
        a.values.rules &&
        a.values.rules.length &&
        a.values.rules.map(rule => {
          const {
            endDate,
            startDate,
            on,
            on: { type: onType, value } = {},
            hours: { intervals },
            hours,
            description,
            every,
            repeats,
            name,
            type: draftType
          } = rule;
          const start = !(startDate instanceof Date) ? new Date(startDate) : startDate;
          const end = !(endDate instanceof Date) ? new Date(endDate) : endDate;
          return {
            name,
            type: draftType,
            description: description || '',
            startDate: moment.utc([start.getFullYear(), start.getMonth(), start.getDate()]).format(),
            ...(endDate
              ? {
                  endDate: moment.utc([end.getFullYear(), end.getMonth(), end.getDate()]).format()
                }
              : {}),
            ...(on && value && value === 'day'
              ? {
                  on: {
                    type: value,
                    value: onType
                  }
                }
              : on ? { on } : {}),
            hours: {
              ...hours,
              ...(intervals && { intervals })
            },
            ...(every && { every }),
            ...(repeats && repeats !== 'none' && { repeats })
          };
        });
      const sdkCall = {
        path: ['business-hours', id, 'drafts', draftId],
        data: {
          name: name.trim(),
          rules: rules || null,
          description: description || '',
          ...(timezone ? { timezone } : {})
        },
        apiVersion: 'v2',
        command: 'updateBusinessHoursV2Draft',
        module: 'entities',
        crudAction: 'update',
        topic: 'cxengage/entities/update-business-hours-v2-draft'
      };

      return {
        ...a,
        sdkCall
      };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            {
              result: {
                itemValue: response.result
              }
            },
            a,
            `<i>Draft</i> was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const toggleBusinessHoursV2Entity = (action$, store) =>
  action$
    .ofType('TOGGLE_ENTITY')
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
      entityStatusActive: getSelectedEntityStatus(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .map(a => {
      a.sdkCall = {
        path: ['business-hours', a.selectedEntityId],
        data: {
          active: !a.entityStatusActive
        },
        apiVersion: 'v2',
        module: 'entities',
        crudAction: 'update',
        topic: 'cxengage/entities/update-business-hours-v2-active'
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${a.entityName.slice(0, -2)} was ${a.entityStatusActive ? 'disabled' : 'enabled'} successfully!`
          )
        )
        .catch(error => handleError(error, { ...a }, 'Status for selected business hour could not be changed'))
    );

export const bulkBusinessHoursV2EntityUpdate = (action$, store) =>
  action$
    .ofType('BULK_ENTITY_UPDATE')
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .map(a => {
      a.allIdsToProcess = getSelectedEntityBulkChangeItems(store.getState());
      a.sdkCall = entitiesMetaData[a.entityName].entityApiRequest('update');
      a.allSdkCalls = [...a.allIdsToProcess.toJS()].reduce((allCalls, item) => {
        const entityData = findEntity(store.getState(), a.entityName, item);
        if (isItemInherited(store.getState(), a.entityName, item)) {
          Toast.error(`"${entityData.get('name')}" is inherited and cannot be edited.`);
          return allCalls;
        }
        if (!entityData.get('activeVersion')) {
          Toast.error(`"${entityData.get('name')}" does not have an active-version and cannot be edited.`);
          return allCalls;
        }
        allCalls.push({
          ...a.sdkCall,
          path: ['business-hours', item],
          data: {
            ...a.values
          }
        });
        return allCalls;
      }, []);
      return { ...a };
    })
    .mergeMap(
      a =>
        a.allSdkCalls.length > 0
          ? forkJoin(
              a.allSdkCalls.map(apiCall =>
                from(
                  sdkPromise(apiCall).catch(error => ({
                    error: error,
                    id: apiCall.data[a.entityName],
                    toString: getEntityItemDisplay(store.getState(), apiCall.data[a.entityName])
                  }))
                )
              )
            )
              .do(allResult => handleBulkSuccess(allResult))
              .mergeMap(result => from(result).map(response => handleSuccess(response, a)))
          : of({ type: 'BULK_ENTITY_UPDATE_cancelled' })
    );

export const PublishDraft = (action$, store) =>
  action$
    .ofType('PUBLISH_BUSINESS_HOURS_V2_DRAFT')
    .map(a => {
      const businessHoursId = getSelectedEntityId(store.getState());
      const { rules, ...draft } = getSelectedSubEntity(store.getState()).toJS();
      const sdkCall = {
        path: ['business-hours', businessHoursId, 'versions'],
        data: {
          ...draft,
          rules: rules.map(({ on, on: { type, value } = {}, repeats, ...rule }) => ({
            ...rule,
            ...(on && value && value === 'day'
              ? {
                  on: {
                    type: value,
                    value: type
                  }
                }
              : on ? { on } : {}),
            ...(repeats && repeats !== 'none' && { repeats })
          })),
          name: a.values.get('versionName').trim()
        },
        apiVersion: 'v2',
        command: 'createBusinessHoursV2Version',
        module: 'entities',
        crudAction: 'create',
        topic: 'cxengage/entities/create-business-hours-v2-version'
      };

      return {
        ...a,
        sdkCall
      };
    })
    .mergeMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .mergeMap(response => {
          const selectedDraft = getSelectedSubEntityId(store.getState());
          return [
            handleSuccess(
              response,
              {
                ...a,
                entityId: a.sdkCall.path[1]
              },
              '<i>Version</i> was created successfully!'
            ),
            ...(a.values.get('makeActive')
              ? [
                  {
                    type: 'UPDATE_ENTITY',
                    entityName: 'businessHoursV2',
                    entityId: a.sdkCall.path[1],
                    values: {
                      activeVersion: a.values.get('makeActive') ? response.result.id : undefined,
                      ...(a.values.get('isInitialDraft') ? { active: true } : {})
                    }
                  }
                ]
              : []),
            {
              type: 'REMOVE_LIST_ITEM',
              listItemId: selectedDraft
            }
          ];
        })
        .catch(error => handleError(error, a))
    );

export const SaveDraftBeforePublish = action$ =>
  action$.ofType('SAVE_BEFORE_PUBLISH_BUSINESS_HOURS_V2_DRAFT').switchMap(action =>
    action$
      .ofType('UPDATE_SUB_ENTITY_FULFILLED')
      .mapTo({
        type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT',
        values: action.values
      })
      .race(
        action$.ofType('UPDATE_SUB_ENTITY_REJECTED').mapTo({
          type: 'PUBLISH_BUSINESS_HOURS_V2_DRAFT_REJECTED'
        })
      )
      .take(1)
      .startWith(submit('draft:edit'))
  );

export const changeIntervalsHours = action$ =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter(
      a =>
        a.meta.form === 'businessHoursV2:rules' &&
        a.payload.hours.intervals &&
        a.payload.hours.intervals.some(interval => interval.end === 0)
    )
    .switchMap(a =>
      of(
        change(a.meta.form, a.meta.field, {
          ...a.payload,
          hours: {
            ...a.payload.hours,
            intervals: a.payload.hours.intervals.map(
              ({ start, end }) => (end !== 0 ? { start, end } : { start, end: 1440 })
            )
          }
        })
      )
    );

export const unselectBusinessHourVersion = (action$, store) =>
  action$
    .ofType('SET_SELECTED_ENTITY_ID')
    .map(a => ({
      entityId: a.entityId,
      entityName: getCurrentEntity(store.getState())
    }))
    .filter(({ entityId, entityName }) => entityName === 'businessHoursV2' && !entityId)
    .map(() => setSelectedBusinessHourVersion(undefined));

export const selectBusinessHourVersionWhenUpdated = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(
      ({ entityName, response: { result: { activeVersion } } }) => entityName === 'businessHoursV2' && activeVersion
    )
    .map(({ response: { result: { activeVersion } } }) => setSelectedBusinessHourVersion(activeVersion));

export const updateBusinessHourV2 = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .map(a => {
      const { name, description, shared, activeVersion, active } = a.values;
      const sdkCall = {
        path: ['business-hours', a.entityId],
        data: {
          ...(name ? { name } : {}),
          ...(description !== undefined ? { description: description || '' } : {}),
          ...(shared !== undefined ? { shared } : {}),
          ...(active !== undefined ? { active } : {}),
          ...(activeVersion !== undefined ? { activeVersion } : {})
        },
        apiVersion: 'v2',
        command: 'updateBusinessHourV2',
        module: 'entities',
        crudAction: 'update',
        topic: 'cxengage/entities/update-business-hour-v2'
      };

      return {
        ...a,
        sdkCall
      };
    })
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => handleSuccess(response, a, `<i>Busines Hours</i> was updated successfully!`))
        .catch(error => handleError(error, a))
    );

// We reinitialize here since the values sent to the API might not be the ones that are needed to render the form properly
export const ReInitBusinessHoursV2Form = action$ =>
  action$
    .ofType('UPDATE_ENTITY_FULFILLED')
    .filter(a => a.entityName === 'businessHoursV2')
    .map(a => ({
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: `${a.entityName}:${a.entityId}`
      },
      payload: a.response.result
    }));

export const RemoveBusinessHoursDraft = (action$, store) =>
  action$
    .ofType('REMOVE_LIST_ITEM')
    .debounceTime(300)
    .map(a => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      listId: getSelectedEntityId(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState())
    }))
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .map(a => ({
      ...a,
      sdkCall: {
        path: ['business-hours', a.listId, 'drafts', a.listItemId],
        command: 'removeBusinessHoursV2Draft',
        apiVersion: 'v2',
        module: 'entities',
        crudAction: 'delete',
        topic: 'cxengage/entities/remove-business-hours-v2-drafts-response'
      }
    }))
    .switchMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            a.selectedEntityId
              ? '<i>Draft</i> has been removed sucessfully'
              : '<i>Business Hour</i> has been removed sucessfully'
          )
        )
        .catch(error => handleError(error, a))
    );

export const FetchActualTenantInfo = (action$, store) =>
  action$
    .ofType('CREATE_DRAFT_BUSINESS_HOURS_V2', 'SET_SELECTED_SUB_ENTITY_ID')
    .filter(() => getCurrentEntity(store.getState()) === 'businessHoursV2')
    .map(a => ({
      type: 'FETCH_DATA_ITEM',
      entityName: 'tenants',
      id: currentTenantId(store.getState())
    }));
