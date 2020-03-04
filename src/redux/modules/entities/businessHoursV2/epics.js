import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { entitiesMetaData } from '../metaData';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';

import { getCurrentEntity } from '../selectors';
import { getAllEntities } from '../../../../containers/EntityTable/selectors';

import { setSelectedSubEntityId, setSelectedEntityId, fetchActiveVersionBusinessHoursFulfilled } from '../index';

export const createBusinessHour = $action =>
  $action
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'businessHoursV2')
    .map(a => {
      a.sdkCall = entitiesMetaData['businessHoursV2'].entityApiRequest('create', 'singleMainEntity');
      a.sdkCall.path = ['business-hours'];
      a.sdkCall.data = a.values;
      a.sdkCall.apiVersion = 'v2';
      return { ...a, type: 'CREATE_DRAFT_AND_BUSINESS_HOUR_V2' };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response => ({
          ...a,
          response
        }))
        .catch(error => handleError(error, a))
    );

export const createDraftAndSaveToState = $action =>
  $action
    .ofType('CREATE_DRAFT_AND_BUSINESS_HOUR_V2')
    .map(a => ({
      ...a,
      sdkCall: {
        path: ['business-hours', a.response.result.id, 'drafts'],
        data: {
          name: 'Initial draft'
        },
        apiVersion: 'v2',
        command: 'createBusinessHourV2Draft',
        module: 'entities',
        crudAction: 'create',
        topic: 'cxengage/entities/create-business-hours-v2-draft'
      }
    }))
    .mergeMap(a =>
      fromPromise(sdkPromise(a.sdkCall)).mergeMap(response => [
        handleSuccess(
          {
            result: {
              ...a.response.result,
              items: [response.result]
            }
          },
          a,
          `<i>Business Hour</i> was created successfully!`
        ),
        setSelectedSubEntityId(response.result.id),
        setSelectedEntityId(a.response.result.id)
      ])
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
              "An active version for a business hour couldn't be retrieved"
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
