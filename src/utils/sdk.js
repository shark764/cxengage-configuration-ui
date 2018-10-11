import { isInIframe } from 'serenova-js-utils/browser';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const sdkPromise = sdkCall => {
  if (isInIframe()) {
    return new Promise((resolve, reject) => {
      /* istanbul ignore next */
      CxEngage[sdkCall.module][sdkCall.command](sdkCall.data, function(error, topic, response) {
        console.log('[SDK] SDK sending back:', error, topic, response);
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      const completeSdkCall = { messageId: guid(), ...sdkCall };
      const handleResponse = event => {
        if (completeSdkCall.messageId === event.data.messageId) {
          const { error, response } = event.data;
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
          removeEventListener('message', handleResponse, false);
        }
      };
      addEventListener('message', handleResponse);
      window.parent.postMessage(completeSdkCall, '*');
    });
  }
};

export const sdkCall = sdkCall =>
  new Promise((resolve, reject) => {
    window.parent.postMessage(sdkCall, '*');
    resolve('Posted Message To Parent iFrame');
  });

export const errorLabel = error => {
  let errorDetails;
  if (
    error.data &&
    error.data.apiResponse &&
    error.data.apiResponse.apiResponse &&
    error.data.apiResponse.apiResponse.response &&
    error.data.apiResponse.apiResponse.response.error
  ) {
    let { code, message } = error.data.apiResponse.apiResponse.response.error;
    errorDetails = ` ${code}: ${message}`;
  }
  return `${error.message} ${errorDetails ? errorDetails : ''}`;
};
