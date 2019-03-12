import { isIgnoredToast } from './errors';
import { errorLabel, errorManager } from '../../../utils/sdk';
import { Toast } from 'cx-ui-components';
import { of } from 'rxjs/observable/of';

export function handleError(error, a) {
  if (
    !isIgnoredToast(a.type, a.entityName) &&
    a.entityName !== 'dispatchMappings' &&
    a.type !== '@@redux-form/CHANGE'
  ) {
    Toast.error(errorLabel(error));
  } else if (a.entityName === 'dispatchMappings') {
    let errorObject = errorManager(error);

    Toast.error(errorObject.errorMessage);
    a.type = `${a.type}_REJECTED`;
    a.errorAttribute = errorObject.attribute;
    return of(a);
  }
  a.type = `${a.type}_REJECTED`;
  return of(a);
}

export function handleSuccess(response, a, successMessage) {
  if (!isIgnoredToast(a.type, a.entityName) && successMessage !== undefined) {
    Toast.success(successMessage);
  }
  if (response !== null && response.error) {
    return { type: `${a.type}_rejected`, error: response.error };
  }
  return { ...a, type: `${a.type}_FULFILLED`, response };
}

export function handleBulkUneeded(a) {
  Toast.warning(`${a.uneededCalls[0].replace('USERS_AFFECTED', a.uneededCalls.length)}`);
}

export function handleBulkSuccess(response, a) {
  const successCalls = response.filter(item => item.error === undefined);
  const failedCalls = response.filter(item => item.error !== undefined);

  if (a && a.uneededCalls && a.uneededCalls.length > 0) {
    Toast.warning(`${a.uneededCalls[0].replace('USERS_AFFECTED', a.uneededCalls.length)}`);
  }

  Toast.success(`${successCalls.length} items updated successfully.`);
  if (failedCalls.length > 0) {
    Toast.error(`
    ${failedCalls.length} items failed to update.
    ${failedCalls.map(
      call => `<br/></br>
      ${call.id}<br/>
      ${call.error.data.apiResponse.apiResponse.response.error.message}
      `
    )}
    `);
  }
}
