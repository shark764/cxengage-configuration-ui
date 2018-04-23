import 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { Toast } from 'cx-ui-components';

import { sdkPromise, errorLabel } from '../../../utils/sdk';

import { getCurrentEntity, getSelectedEntityId } from '../entities/selectors';

import { updateEntityFulfilled, updateEntityInFulfilled } from '../entities';

export const UpdateEntity = (action$, store) =>
  action$
    .ofType('UPDATE_ENTITY')
    .filter(({ entityName }) => entityName === 'emailTemplates')
    .map(action => ({
      ...action,
      currentEntity: getCurrentEntity(store.getState()),
      selectedIdentityId: getSelectedEntityId(store.getState()),
      initialValues: store
        .getState()
        .getIn([
          'form',
          `emailTemplates:${getSelectedEntityId(store.getState())}`,
          'initial'
        ])
        .toJS()
    }))
    .mergeMap(a => {
      // Don't submit the form if the user changes a custom email field, then changes email back to "default"
      if (
        !(a.initialValues.email === 'default' && a.values.email === 'default')
      ) {
        return fromPromise(
          sdkPromise(
            {
              module: 'entities',
              command:
                a.values.email === 'custom'
                  ? 'createEmailTemplate'
                  : 'updateEmailTemplate',
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
                    }
            },
            a.values.email === 'custom'
              ? 'cxengage/entities/create-email-template-response'
              : 'cxengage/entities/update-email-template-response'
          )
        )
          .map(response => {
            Toast.success('Email template was updated successfully!');
            return updateEntityFulfilled(
              a.entityName,
              a.entityId,
              response,
              a.values
            );
          })
          .catch(error => {
            Toast.error(errorLabel(error));
            return of({
              type: 'UPDATE_ENTITY_REJECTED',
              entityName: a.entityName,
              entityId: a.entityId
            });
          });
      } else {
        Toast.info('"Default Email" is unchanged. Nothing to submit.');
        return of({
          type: 'UPDATE_ENTITY_REJECTED',
          entityName: a.entityName,
          entityId: a.entityId
        });
      }
    });
