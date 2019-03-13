import { sdkPromise } from './sdk';

export function apiCall(urlSuffix, method = 'GET', data) {
  return sdkPromise({
    module: 'updateLocalStorage',
    command: `updateLocalStorage`,
    data: 'updateLocalStorage',
    topic: 'updateLocalStorage'
  }).then(({tenant: {tenantId}, token, baseUrl}) => {
    const url = `${baseUrl}/v1/tenants/${tenantId}/${urlSuffix}`;
    const requestParams =  {
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      Authorization: 'Token ' + token,
      headers: {
          "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
    };
    requestParams.method = method;
    if(token) {
      requestParams.headers.Authorization = 'Token ' + token;
    }
    if(data) {
      requestParams.body = JSON.stringify(data);
    }
      return fetch(url, requestParams)
      .then(response => {
        
        if(response.status === 401) {
          return 'Unauthorized';
        } else if ( response.status >= 300) {
          return;
        } else {
          return response.json();
        }
      });

  });
}

export function updateBetaFeatures(featuresObject) {
  return apiCall('settings/betaFeatures/value', 'PUT', featuresObject);
}

export function readBetaFeatures(featuresObject) {
  return apiCall('settings/betaFeatures/value');
}