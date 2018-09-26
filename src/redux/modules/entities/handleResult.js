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
  if (!isIgnoredToast(a.type, a.entityName)) {
    Toast.success(successMessage);
  }
  return { ...a, type: `${a.type}_FULFILLED`, response };
}

export function handleBulkSuccess(response) {
  Toast.success(`${response.length} items updated successfully.`);
}
