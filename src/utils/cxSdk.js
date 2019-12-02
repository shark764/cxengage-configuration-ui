import axios from 'axios';

export function loadSdkConf() {
  const relativeUrl = window.location.href.substr(0, window.location.href.lastIndexOf('#/'));
  const baseUrl = relativeUrl.endsWith('index.html')
    ? relativeUrl.substr(0, relativeUrl.lastIndexOf('index.html'))
    : relativeUrl;
  axios({
    method: 'get',
    url: `${baseUrl}config.json?t=${Date.now()}`
  }).then(res => {
    if (typeof res.data !== 'undefined') {
      if (window.Config2Conf !== undefined) {
        if (window.Config2Conf.version !== res.data.config.version) {
          clearInterval(versionCheck);
        }
      }
      window.Config2Conf = res.data.config;
    }
    if (typeof window.Config2Conf !== 'undefined' && typeof window.CxEngage.subscribe === 'undefined') {
      const sdkConf = {
        baseUrl: `https://${window.Config2Conf.api}`,
        environment: window.Config2Conf.env,
        logLevel: window.Config2Conf.logLevel,
        blastSqsOutput: window.Config2Conf.blastSqsOutput,
        reportingRefreshRate: window.Config2Conf.refreshRate
      };
      CxEngage.initialize(sdkConf);
    }
  });
}

export function versionCheck() {
  // Cache busting version check every 5min
  return setInterval(loadSdkConf, 300000);
}

export function cxInit() {
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('ngrok')) {
    if (window.self === window.top && CxEngage.initialize) {
      const sdkConf = {
        environment: 'qe',
        baseUrl: 'https://qe-api.cxengagelabs.net/v1/',
        logLevel: 'debug',
        blastSqsOutput: true,
        reportingRefreshRate: 10000,
        supervisorMode: true
      };
      CxEngage.initialize(sdkConf);
    }
  } else {
    loadSdkConf();
    setInterval(versionCheck, 300000);
  }
}

export function cxLogin(username, password, callback) {
  CxEngage.authentication.login(
    {
      username: username,
      password: password
      // ttl is good to comment out to be able to test what
      // happens when authentication expires...
      // ttl in seconds
      // ttl: 60
    },
    (err, topic, response) => {
      if (err) {
        console.warn('ERROR WITH LOGIN', err);
        return callback(err);
      } else {
        return callback(response);
      }
    }
  );
}

export function cxTokenLogin(token, callback) {
  CxEngage.authentication.login({ token: token }, (err, topic, response) => {
    if (err) {
      console.warn('ERROR WITH LOGIN', err);
      return callback(err);
    } else {
      return callback(response);
    }
  });
}

export function cxSetTenant(selectedTenant, callback) {
  CxEngage.session.setActiveTenant({ tenantId: selectedTenant, noSession: true }, (err, topic, response) => {
    if (err) {
      console.warn('ERROR WITH TENANT SELECTION', err);
    } else {
      return callback(response);
    }
  });
}
