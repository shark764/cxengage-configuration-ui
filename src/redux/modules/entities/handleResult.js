import { isIgnoredToast } from './errors';
import { errorManager } from '../../../utils/sdk';
import { Toast } from 'cx-ui-components';
import { of } from 'rxjs/observable/of';

export function handleError(error, a) {
  if (!isIgnoredToast(a.type, a.entityName) && a.type !== '@@redux-form/CHANGE') {
    Toast.error(errorManager(error).errorMessage);
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
  Toast.warning(`${a.uneededCalls[0].replace('BULKED_ITEMS_AFFECTED', a.uneededCalls.length)}`);
}

export function handleBulkSuccess(response, a, successMessage = null, errorMessage = null, notAffectedMessage = null) {
  const successCalls = response.filter(item => item.error === undefined);
  const failedCalls = response.filter(item => item.error !== undefined);

  if (a && a.uneededCalls && a.uneededCalls.length > 0) {
    Toast.warning(`${a.uneededCalls[0].replace('BULKED_ITEMS_AFFECTED', a.uneededCalls.length)}`);
  }

  if (successMessage && successCalls.length > 0) {
    Toast.success(successMessage.replace('BULKED_ITEMS_AFFECTED', successCalls.length));
  } else if (successCalls.length > 0) {
    Toast.success(`${successCalls.length} item(s) updated successfully.`);
  }
  if (errorMessage && failedCalls.length > 0) {
    Toast.error(errorMessage.replace('BULKED_ITEMS_AFFECTED', failedCalls.length));
  } else if (failedCalls.length > 0) {
    Toast.error(`
    ${failedCalls.length} item(s) failed to update.
    ${failedCalls.map(
      call => `<br/></br>
      ${call.id}<br/>
      ${call.error.data.apiResponse.apiResponse.response.error.message}
      `
    )}
    `);
  }

  if (a && a.bulkNotAffected) {
    const notAffectedLength = a.bulkNotAffected.length || Object.keys(a.bulkNotAffected).length;
    if (notAffectedLength > 0) {
      if (notAffectedMessage) {
        Toast.warning(notAffectedMessage.replace('BULKED_ITEMS_AFFECTED', notAffectedLength));
      } else {
        Toast.warning(`${notAffectedLength} item(s) not affected.`);
      }
    }
  }
}
