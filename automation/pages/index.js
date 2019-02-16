const {Element} = require('cx-automation-utils/pageObject'); 
const elements = { 
username: new Element('[automation="username"]'), 
password: new Element('[automation="password"]'), 
signInButton: new Element('[automation="signInButton"]'), 
tenantSelect: new Element('[automation="tenantSelect"]'), 
chooseTenantButton: new Element('[automation="chooseTenantButton"]'), 
loading: new Element('[automation="loading"]'), 
flowsCopyFormFieldName: new Element('[automation="flowsCopyFormFieldName"]'), 
flowsCopyFormFieldDescription: new Element('[automation="flowsCopyFormFieldDescription"]'), 
flowsFormFieldName: new Element('[automation="flowsFormFieldName"]'), 
flowsFormFieldDescription: new Element('[automation="flowsFormFieldDescription"]'), 
flowsFormFieldType: new Element('[automation="flowsFormFieldType"]'), 
flowsFormFieldActiveVersion: new Element('[automation="flowsFormFieldActiveVersion"]'), 

 }; 
 module.exports = elements;