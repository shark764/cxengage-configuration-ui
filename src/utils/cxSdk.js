export function cxInit() {
  return CxEngage.initialize(require('../sdkConfig.json'));
}

export function cxLogin(username, password, callback) {
  CxEngage.authentication.login({ 
    username: username, 
    password: password,
    // ttl is good to comment out to be able to test what 
    // happens when authentication expires...
    // ttl in seconds 
    // ttl: 60 
  }, (err, topic, response) => {
    if (err) {
      console.warn('ERROR WITH LOGIN', err);
      return callback(err);
    } else {
      return callback(response);
    }
  });
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
