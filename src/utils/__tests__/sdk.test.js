import * as SDK from '../sdk';

describe('sdkPromise', () => {
  it('calls an sdk promise with correct topic should result resolve promise with proper result', () => {
    global.addEventListener = (message, func) =>
      func({
        data: {
          topic: ['updateLocalStorage'],
          error: false,
          response: 'mockResponse'
        }
      });
    SDK.sdkPromise(
      {
        module: 'updateLocalStorage',
        command: `updateLocalStorage`,
        data: 'updateLocalStorage'
      },
      `updateLocalStorage`
    ).then(a => expect(a).toEqual('mockResponse'));
  });
  it('calls an sdk promise and sdk returned an error, promise should reject with the error from sdk', () => {
    global.addEventListener = (message, func) =>
      func({
        data: {
          topic: ['updateLocalStorage'],
          error: 'ERROR FROM SDK',
          response: 'mockResponse'
        }
      });
    SDK.sdkPromise(
      {
        module: 'updateLocalStorage',
        command: `updateLocalStorage`,
        data: 'updateLocalStorage'
      },
      `updateLocalStorage`
    ).catch(err => expect(err).toEqual('ERROR FROM SDK'));
  });
  it('calls an sdk promise with undefined topic , should result in promise rejection "Topic mismatch"', () => {
    global.addEventListener = (message, func) =>
      func({ data: { error: 'ERROR', topic: ['updateLocalStorage'] } });
    SDK.sdkPromise(
      {
        module: 'updateLocalStorage',
        command: `updateLocalStorage`,
        data: 'updateLocalStorage'
      },
      undefined
    ).catch(err => expect(err).toEqual('Topic mismatch'));
  });
  it('topic returned from sdk doesn\'t match topic provided , should result in promise rejection "Topic mismatch"', () => {
    global.addEventListener = (message, func) =>
      func({ data: { error: 'ERROR', topic: ['update-Local-Storage'] } });
    SDK.sdkPromise(
      {
        module: 'updateLocalStorage',
        command: `updateLocalStorage`,
        data: 'updateLocalStorage'
      },
      'updateLocalStorage'
    ).catch(err => expect(err).toEqual('Topic mismatch'));
  });
});

describe('sdkCall', () => {
  it('calls an sdkCall and should always resolve', () => {
    SDK.sdkCall({
      module: 'updateLocalStorage',
      command: `updateLocalStorage`,
      data: 'updateLocalStorage'
    }).then(a => expect(a).toEqual('Posted Message To Parent iFrame'));
  });
});

describe('errorLabel', () => {
  it('calls errorLabel with error object', () => {
    const returnedError = SDK.errorLabel({
      message: 'mockMessage',
      data: {
        apiResponse: {
          apiResponse: {
            response: {
              error: {
                code: 'mockCode',
                message: 'mockResponseMessage'
              }
            }
          }
        }
      }
    });
    expect(returnedError).toMatchSnapshot();
  });
  it('calls errorLabel with mockMessage', () => {
    const returnedError = SDK.errorLabel({
      message: 'mockMessage'
    });
    expect(returnedError).toMatchSnapshot();
  });
});
