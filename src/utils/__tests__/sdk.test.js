import * as SDK from '../sdk';

// This make the test think it's in an iframe
window.parent = 'window';

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
    SDK.sdkPromise({
      module: 'updateLocalStorage',
      command: `updateLocalStorage`,
      data: 'updateLocalStorage',
      topic: 'updateLocalStorage'
    }).then(a => expect(a).toEqual('mockResponse'));
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
    SDK.sdkPromise({
      module: 'updateLocalStorage',
      command: `updateLocalStorage`,
      data: 'updateLocalStorage',
      topic: 'updateLocalStorage'
    }).catch(err => expect(err).toEqual('ERROR FROM SDK'));
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
