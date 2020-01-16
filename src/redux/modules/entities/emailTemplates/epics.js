import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { Toast } from 'cx-ui-components';

import { sdkPromise } from '../../../../utils/sdk';

import { getCurrentFormInitialValues } from '../../form/selectors';

import { updateEntityRejected } from '../';

import { handleSuccess, handleError } from '../handleResult';

export const UpdateEmailTemplate = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'emailTemplates')
    .map(action => ({
      ...action,
      initialValues: getCurrentFormInitialValues(store.getState())
    }))
    .mergeMap(a => {
      // Don't submit the form if the user changes a custom email field, then changes email back to "default"
      if (!(a.initialValues.email === 'default' && a.values.email === 'default')) {
        return fromPromise(
          sdkPromise({
            module: 'entities',
            command: a.values.email === 'custom' ? 'createEmailTemplate' : 'updateEmailTemplate',
            data:
              a.values.email === 'custom'
                ? {
                    ...a.values,
                    emailTypeId: a.entityId,
                    active: true
                  }
                : {
                    emailTypeId: a.entityId,
                    active: false
                  },
            topic:
              a.values.email === 'custom'
                ? 'cxengage/entities/create-email-template-response'
                : 'cxengage/entities/update-email-template-response'
          })
        )
          .map(response => handleSuccess(response, a, 'Email Template was updated successfully!'))
          .catch(error => handleError(error, a));
      } else {
        Toast.info('"Default Email" is unchanged. Nothing to submit.');
        return of(updateEntityRejected(a.entityName, a.entityId));
      }
    });
