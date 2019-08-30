import { isInIframe } from 'serenova-js-utils/browser';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';
import store from '../redux/store';

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
          console.warn('ERROR', error);
          if (error.data && error.data.apiResponse && error.data.apiResponse.status) {
            store.dispatch({ type: 'TOGGLE_USER_AUTH' });
          }
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
    let responseError = error.data.apiResponse.apiResponse.response.error;
    let { code, message } = responseError;
    errorDetails = ` ${code}: ${message}`;
    if (code === undefined || message === undefined) {
      errorDetails = ` ${error.data.apiResponse.status}: ${responseError}`;
    }
  }
  return `${error.message} ${errorDetails ? errorDetails : ''}`;
};

//errorManager
export const errorManager = error => {
  let messageFromAPI;
  let errorDetails;
  let attr;
  if (
    error.data &&
    error.data.apiResponse &&
    error.data.apiResponse.apiResponse &&
    error.data.apiResponse.apiResponse.response &&
    error.data.apiResponse.apiResponse.response.error
  ) {
    let code = error.data.apiResponse.status;
    let responseError = error.data.apiResponse.apiResponse.response.error;

    if (responseError instanceof Array) {
      messageFromAPI = responseError[0];
    } else if (typeof responseError === 'object') {
      let { code, message, attribute } = responseError;
      attr = Object.keys(attribute)[0];
      errorDetails = ` ${code}: ${message}`;

      if (attribute && typeof attribute === 'object') {
        messageFromAPI = attribute[attr];
        errorDetails = ` ${error.message} ${code}: ${capitalizeFirstLetter(attribute[attr])}`;
      } else if (attribute && message) {
        messageFromAPI = message;
        errorDetails = ` ${error.message} ${code}: ${capitalizeFirstLetter(message)}.`;
      } else if (code === undefined || message === undefined) {
        errorDetails = ` ${error.data.apiResponse.status}: ${responseError}`;
      }
    }

    if (
      ['same value', 'already exist', 'already registered', 'duplicate found'].some(function(keyword) {
        // checks whether a keyword exist in the API message
        return messageFromAPI.includes(keyword);
      }) &&
      // The only entity that has its own messages is DispatchMappings
      !messageFromAPI.includes('channel type')
    ) {
      errorDetails = ` ${
        error.message
      } ${code}: Resource with the same name or value already exists in the system, please enter a different value.`;
    }
  }
  return { errorMessage: errorDetails ? errorDetails : 'An error has occurred.', attribute: attr };
};
