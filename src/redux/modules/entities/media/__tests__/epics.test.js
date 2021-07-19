import { ActionsObservable } from 'redux-observable';
import { CreateUpdateAfterFileUpload, MediaTypeChanged, MediaFileSelected } from '../epics';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import { getCurrentEntity, getSelectedEntityId } from '../../../entities/selectors';
import { getCurrentFormValues } from '../../../form/selectors';
import { fromJS } from 'immutable';

jest.mock('../../../../../utils/sdk');
sdkPromise.mockReturnValue(new Promise((resolve) => resolve('mock response')));

jest.mock('../../../form/selectors');
jest.mock('serenova-js-utils/uuid');
jest.mock('../../../../../utils/sdk');
jest.mock('../selectors');
jest.mock('../../selectors');

getCurrentEntity.mockImplementation(() => 'media');
jest.mock('../selectors', () => ({
  isSaving: () => true,
  isBulkUpdating: () => true,
  getSelectedEntityFormId: () => 'mock selected entity form id',
  getSelectedEntity: () => 'mock selected entity',
  getSelectedEntityId: () => 'mock selected entity id',
  getSelectedEntityBulkChangeItems: () => 'mock bulk selected',
}));

const mockFormValues = fromJS({
  id: 'mockMediaId',
  name: 'mockMediaName',
  values: {
    tenantId: '2d5ebdd3-cf4d-49f0-8d74-c2ae054b0780',
    name: 'Agent Wait Music',
    properties: {},
    sourceFile: {},
    type: 'audio',
    source: '',
    id: '132df310-4e9a-11ea-8f03-bae0982fb335',
    description: 'Listen to some music while you connect to customer.....',
  },
});

getCurrentFormValues.mockImplementation(() => mockFormValues);

describe('CreateUpdateAfterFileUpload - create', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'UPLOAD_MEDIA_FILE_FULFILLED',
      entityName: 'media',
      values: {},
      sdkCall: {
        path: ['media', 'upload'],
        module: 'entities',
        crudAction: 'createFile',
        data: {},
        topic: 'cxengage/entities/upload-media-file',
      },
      response: {
        result: {
          url:
            'https://cxengagelabs-qe-configurator-media.s3.amazonaws.com/2d5ebdd3-cf4d-49f0-8d74-c2ae054b0780/9ed46feb-fc91-4024-be5b-b07e31ca3749/file_example_MP3_1MG%20%281%29.mp3',
        },
      },
    });
  });
  it('When CreateUpdateAfterFileUpload is on new record', (done) => {
    getSelectedEntityId.mockImplementation(() => 'create');
    CreateUpdateAfterFileUpload(action, mockStore).subscribe((actualOutputActions) => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('CreateUpdateAfterFileUpload - update', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: 'UPLOAD_MEDIA_FILE_FULFILLED',
      entityName: 'media',
      values: {},
      sdkCall: {
        path: ['media', 'upload'],
        module: 'entities',
        crudAction: 'createFile',
        data: {},
        topic: 'cxengage/entities/upload-media-file',
      },
      response: {
        result: {
          url:
            'https://cxengagelabs-qe-configurator-media.s3.amazonaws.com/2d5ebdd3-cf4d-49f0-8d74-c2ae054b0780/9ed46feb-fc91-4024-be5b-b07e31ca3749/file_example_MP3_1MG%20%281%29.mp3',
        },
      },
    });
  });
  it('when CreateUpdateAfterFileUpload is update', (done) => {
    getSelectedEntityId.mockImplementation(() => 'mockId');
    CreateUpdateAfterFileUpload(action, mockStore).subscribe((actualOutputActions) => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MediaTypeChanged payload is list', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'media',
        field: 'type',
      },
      payload: 'list',
    });
  });
  it('when payload is list need to create new list[]', (done) => {
    MediaTypeChanged(action, mockStore).subscribe((actualOutputActions) => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MediaTypeChanged payload is not list', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'media',
        field: 'type',
      },
      payload: 'tts',
    });
  });
  it('when payload is tts need to blank out source', (done) => {
    MediaTypeChanged(action, mockStore).subscribe((actualOutputActions) => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('MediaFileSelected is populated', () => {
  let action;
  beforeEach(() => {
    action = ActionsObservable.of({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'media',
        field: 'sourceFile',
      },
    });
  });
  it('when payload contains sourceFile', (done) => {
    MediaFileSelected(action, mockStore).subscribe((actualOutputActions) => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
