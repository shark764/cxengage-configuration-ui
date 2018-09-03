export const sdkPromise = (sdkCall) =>
  new Promise((resolve, reject) => {
    const handleResponse = event => {
      if (event.data.topic !== undefined && event.data.topic[0] === sdkCall.topic) {
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
    window.parent.postMessage(sdkCall, '*');
  });

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
