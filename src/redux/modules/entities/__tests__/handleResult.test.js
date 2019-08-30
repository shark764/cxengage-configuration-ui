import { handleError, handleSuccess, handleBulkSuccess, handleBulkUneeded } from '../handleResult';

// Toast notifications are not currently tested in these unit tests
// However they are writted in a way it can be added as needed
describe('handleError', () => {
  it('returns an observable with type REJECTED appended', () => {
    expect(handleError('mock_error', { type: 'MOCK_ACTION', entityName: 'MOCK_ENTITY' })).toMatchSnapshot();
  });
  it('no toast notification', () => {
    expect(handleError('mock_error', { type: '@@redux-form/CHANGE', entityName: 'MOCK_ENTITY' })).toMatchSnapshot();
  });
});

describe('handleSuccess', () => {
  it('returns an observable with type _FULFILLED appended', () => {
    expect(
      handleSuccess({ data: '' }, { type: 'MOCK_ACTION', entityName: 'MOCK_ENTITY' }, 'success message')
    ).toMatchSnapshot();
  });
  it('no toast notiication', () => {
    expect(
      handleSuccess({ data: '' }, { type: 'MOCK_ACTION', entityName: 'MOCK_ENTITY' }, undefined)
    ).toMatchSnapshot();
  });
  it('response contained an error object fire "_rejected" action', () => {
    expect(
      handleSuccess({ error: 'error message' }, { type: 'MOCK_ACTION', entityName: 'MOCK_ENTITY' }, undefined)
    ).toMatchSnapshot();
  });
});

describe('handleBulkSuccess', () => {
  it('returns an observable with type _FULFILLED appended', () => {
    expect(
      handleBulkSuccess([
        {
          ok: '',
          ok2: '',
          error: { data: { apiResponse: { apiResponse: { response: { error: { message: 'error' } } } } } }
        }
      ])
    ).toMatchSnapshot();
  });
  it('no toast notiication', () => {
    expect(handleBulkSuccess([{ ok: '', ok2: '', ok3: '' }])).toMatchSnapshot();
  });
  it('response contained an error object fire "_rejected" action', () => {
    expect(handleBulkSuccess([{ ok: '', ok2: '', ok3: '' }])).toMatchSnapshot();
  });
  it('response contained uneeded calls', () => {
    expect(
      handleBulkSuccess([{ ok: '', ok2: '', ok3: '' }], {
        uneededCalls: ['Error occurred. BULKED_ITEMS_AFFECTED affected']
      })
    ).toMatchSnapshot();
  });
});

describe('handleBulkUneeded', () => {
  it('Throws a notification with number of entity items affected', () => {
    expect(handleBulkUneeded({ uneededCalls: ['Error occurred. BULKED_ITEMS_AFFECTED affected'] })).toMatchSnapshot();
  });
});
