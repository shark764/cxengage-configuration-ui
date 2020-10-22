import { isInIframe } from 'serenova-js-utils/browser';
import { capitalizeFirstLetter } from 'serenova-js-utils/strings';
import store from '../redux/store';
import { getCurrentEntity } from '../redux/modules/entities/selectors';
import { updateRealtimeStatisticsBatchData } from '../redux/modules/reporting/agentStateMonitoring';
import { updateTableData } from '../redux/modules/reporting/interactionMonitoring';

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
      const currentEntity = getCurrentEntity(store.getState());
      if (
        sdkCall.module === 'subscribe' &&
        (currentEntity === 'interactionMonitoring' || currentEntity === 'agentStateMonitoring')
      ) {
        CxEngage.subscribe(sdkCall.command, function(error, topic, response) {
          if (error) {
            console.error('ERROR', error);
            reject(error);
          } else {
            if (currentEntity === 'agentStateMonitoring') {
              store.dispatch(
                updateRealtimeStatisticsBatchData({
                  resources: response.resourceCapacity.body.results.resourceCapacity,
                  agentStates: response.resourceStateList.body.results.json
                })
              );
            } else {
              store.dispatch(updateTableData(response.interactionsInConversationList.body.results.interactions));
            }
            resolve(response);
          }
        });
      } else {
        /* istanbul ignore next */
        function handleCall(error, topic, response) {
          console.log('[SDK] SDK sending back:', error, topic, response);
          if (error) {
            console.warn('ERROR', error);
            if (error.data && error.data.apiResponse && error.data.apiResponse.status === 401) {
              store.dispatch({ type: 'TOGGLE_USER_AUTH' });
            }
            reject(error);
          } else {
            resolve(response);
          }
        }

        if (CxEngage[sdkCall.module][sdkCall.command] === undefined) {
          const requestObject = {
            path: sdkCall.path,
            body: sdkCall.data,
            customTopic: sdkCall.topic
          };
          if (sdkCall.apiVersion) {
            requestObject['apiVersion'] = sdkCall.apiVersion;
          }
          CxEngage.api[sdkCall.crudAction](requestObject, handleCall);
        } else {
          CxEngage[sdkCall.module][sdkCall.command](sdkCall.data, handleCall);
        }
      }
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
    ((error.data.apiResponse.apiResponse &&
      error.data.apiResponse.apiResponse.response &&
      error.data.apiResponse.apiResponse.response.error) ||
      (error.data.apiResponse.response && error.data.apiResponse.response.error))
  ) {
    let code = error.data.apiResponse.status;
    let responseError =
      (error.data.apiResponse &&
        error.data.apiResponse.apiResponse &&
        error.data.apiResponse.apiResponse.response.error) ||
      error.data.apiResponse.response.error;
    if (responseError instanceof Array) {
      messageFromAPI = responseError[0];
    } else if (typeof responseError === 'object') {
      // Not all APIs return the same error structure
      // in some cases message is null or undefined, so
      // we add the same default message as Config-UI1.
      let { code, message = 'Some bulk actions could not be applied.', attribute } = responseError;
      attr = attribute && Object.keys(attribute)[0];
      errorDetails = ` ${code}: ${message}`;

      if (attribute && typeof attribute === 'object') {
        messageFromAPI = attribute[attr];
        errorDetails = ` ${error.message} ${code}: ${capitalizeFirstLetter(attribute[attr])}`;
      } else if (error.message && message) {
        messageFromAPI = message;
        errorDetails = ` ${error.message}<br/>${code}: ${capitalizeFirstLetter(message)}.`;
      } else if (code === undefined || message === undefined) {
        errorDetails = ` ${error.data.apiResponse.status}: ${responseError}`;
        messageFromAPI = message;
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
