import { isIgnoredToast } from './errors';
import { errorLabel } from '../../../utils/sdk';
import { Toast } from 'cx-ui-components';
import { of } from 'rxjs/observable/of';

export function handleError(error, a) {
  if (!isIgnoredToast(a.type, a.entityName)) {
    Toast.error(errorLabel(error));
  }
  a.type = `${a.type}_REJECTED`;
  return of(a);
}

export function handleSuccess(response, a, successMessage) {
  if (!isIgnoredToast(a.type, a.entityName) && successMessage !== undefined) {
    Toast.success(successMessage);
  }
  if (response !== null && response.error) {
    console.warn(response.error);
    return { type: `${a.type}_rejected`, error: response.error };
  }
  return { ...a, type: `${a.type}_FULFILLED`, response };
}

export function handleBulkSuccess(response) {
  const successCalls = response.filter(item => item.error === undefined);
  const failedCalls = response.filter(item => item.error !== undefined);

  Toast.success(`
  ${successCalls.length} items updated successfully.
  `);
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
