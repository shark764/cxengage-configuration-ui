const {Element} = require('cx-automation-utils/pageObject'); 
const elements = { 
username: new Element('[automation="username"]'), 
password: new Element('[automation="password"]'), 
signInButton: new Element('[automation="signInButton"]'), 
tenantSelect: new Element('[automation="tenantSelect"]'), 
chooseTenantButton: new Element('[automation="chooseTenantButton"]'), 
loading: new Element('[automation="loading"]'), 

 }; 
 module.exports = elements;