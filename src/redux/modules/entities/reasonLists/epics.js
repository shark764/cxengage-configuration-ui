import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { entitiesMetaData } from '../metaData';
import { camelCaseToRegularFormAndRemoveLastLetter } from 'serenova-js-utils/strings';
import { getSelectedEntity } from '../selectors';

export const UpdatePresenceReasonList = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'reasonLists')
    .map(a => {
      a.sdkCall = entitiesMetaData['reasonLists'].entityApiRequest('update', 'singleMainEntity');

      a.values.active = getSelectedEntity(store.getState()).get('active');

      a.sdkCall.data = {
        ...a.values,
        reasonListId: a.entityId
      };
      return { ...a };
    })
    .concatMap(a =>
      fromPromise(sdkPromise(a.sdkCall))
        .map(response =>
          handleSuccess(
            response,
            a,
            `${camelCaseToRegularFormAndRemoveLastLetter('reasonLists')} was updated successfully!`
          )
        )
        .catch(error => handleError(error, a))
    );
