import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';

export const UpdateDispatchMapping = action$ =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dispatchMappings')
    .map(a => {
      a.sdkCall = entitiesMetaData['dispatchMappings'].entityApiRequest('update', 'singleMainEntity');

      a.values.version = a.values.version === 'null' ? null : a.values.version;

      a.sdkCall.data = {
        ...a.values,
        dispatchMappingId: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dispatchMappings')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );

export const CreateDispatchMapping = action$ =>
  action$
    .ofType('CREATE_ENTITY')
    .filter(({ entityName }) => entityName === 'dispatchMappings')
    .map(a => {
      a.sdkCall = entitiesMetaData['dispatchMappings'].entityApiRequest('create', 'singleMainEntity');

      a.values.version = a.values.version === 'null' ? null : a.values.version;

      a.sdkCall.data = a.values;

      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('dispatchMappings')} was created successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
