import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { fromPromise } from 'rxjs/observable/fromPromise';
import { sdkPromise } from '../../../../utils/sdk';
import { handleSuccess, handleError } from '../handleResult';
import { getCurrentFormValues } from '../../../modules/form/selectors';
import { change } from 'redux-form';
import { getCurrentEntity, getSelectedEntityId, getSelectedEntityFormId } from '../selectors';
import { List } from 'immutable';

export const CreateUpdateMedia = (action$, store) =>
  action$
    .ofType('FORM_SUBMIT')
    .map((a) => ({
      ...a,
      entityName: getCurrentEntity(store.getState()),
      selectedEntityId: getSelectedEntityId(store.getState()),
    }))
    .filter(({ dirty, entityName }) => dirty && entityName === 'media')
    .map((a) => {
      const sourceFile = a.values.get('sourceFile');
      if (a.values.get('type') === 'audio' && sourceFile) {
        return {
          type: 'UPLOAD_MEDIA_FILE',
          entityName: a.entityName,
          values: a.values.toJS().sourceFile,
        };
      } else {
        if (a.selectedEntityId === 'create') {
          return {
            type: 'CREATE_ENTITY',
            entityName: a.entityName,
            values: a.values.toJS(),
          };
        } else {
          return {
            type: 'UPDATE_ENTITY',
            entityName: a.entityName,
            entityId: a.selectedEntityId,
            values: a.values.toJS(),
          };
        }
      }
    });

export const UploadMedia = (action$, store) =>
  action$
    .ofType('UPLOAD_MEDIA_FILE')
    .map((a) => {
      a.sdkCall = {
        path: ['media', 'upload'],
        module: 'entities',
        crudAction: 'createFile',
        data: a.values,
        topic: 'cxengage/entities/upload-media-file',
      };
      return { ...a };
    })
    .concatMap((a) =>
      fromPromise(sdkPromise(a.sdkCall))
        .map((response) =>
          handleSuccess(
            response,
            a,
            `${a.entityName[0].toUpperCase()}${a.entityName.slice(1)} file uploaded successfully!`
          )
        )
        .catch((error) => handleError(error, a))
    );

export const CreateUpdateAfterFileUpload = (action$, store) =>
  action$
    .ofType('UPLOAD_MEDIA_FILE_FULFILLED')
    .map((a) => {
      const formValues = getCurrentFormValues(store.getState());
      const { sourceFile, ...restOfValues } = formValues.toJS();
      a.values = restOfValues;
      a.values.source = a.response.result.url;

      return a;
    })
    .map((a) => {
      const selectedEntityId = getSelectedEntityId(store.getState());

      if (selectedEntityId === 'create') {
        return {
          type: 'CREATE_ENTITY',
          entityName: a.entityName,
          values: a.values,
        };
      } else if (selectedEntityId === 'bulk') {
        return {
          type: 'BULK_ENTITY_UPDATE',
          entityName: a.entityName,
          values: a.values,
        };
      } else {
        return {
          type: 'UPDATE_ENTITY',
          entityName: a.entityName,
          entityId: a.selectedEntityId,
          values: a.values,
        };
      }
    });

export const MediaTypeChanged = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter((a) => a.meta.form.includes('media') && a.meta.field.includes('type'))
    .map((a) => {
      if (a.payload === 'list') {
        return change(getSelectedEntityFormId(store.getState()), 'source', new List([]));
      } else {
        return change(getSelectedEntityFormId(store.getState()), 'source', '');
      }
    });

export const MediaFileSelected = (action$, store) =>
  action$
    .ofType('@@redux-form/CHANGE')
    .filter((a) => a.meta.form.includes('media') && a.meta.field.includes('sourceFile'))
    .map((a) => {
      return change(getSelectedEntityFormId(store.getState()), 'source', '');
    });
