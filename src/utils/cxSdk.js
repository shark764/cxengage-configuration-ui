export function cxInit() {
  return CxEngage.initialize(require('../sdkConfig.json'));
}

export function cxLogin(username, password, callback) {
  CxEngage.authentication.login({ username: username, password: password }, (err, topic, response) => {
    if (err) {
      console.warn('ERROR WITH LOGIN', err);
    } else {
      return callback(response);
    }
  });
}

export function cxSetTenant(selectedTenant, callback) {
  CxEngage.session.setActiveTenant({ tenantId: selectedTenant }, (err, topic, response) => {
    if (err) {
      console.warn('ERROR WITH TENANT SELECTION', err);
    } else {
      return callback(response);
    }
  });
}
