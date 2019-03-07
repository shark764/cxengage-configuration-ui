const {Element} = require('cx-automation-utils/pageObject'); 
const elements = { 
dispatchMappingsFormFieldName: new Element('[automation="dispatchMappingsFormFieldName"]'), 
dispatchMappingsFormFieldDescription: new Element('[automation="dispatchMappingsFormFieldDescription"]'), 
dispatchMappingsFormFieldChannelType: new Element('[automation="dispatchMappingsFormFieldChannelType"]'), 
dispatchMappingsFormFieldInteractionField: new Element('[automation="dispatchMappingsFormFieldInteractionField"]'), 
dispatchMappingsFormFieldValue: new Element('[automation="dispatchMappingsFormFieldValue"]'), 
dispatchMappingsFormFieldFlowId: new Element('[automation="dispatchMappingsFormFieldFlowId"]'), 
dispatchMappingsFormFieldVersion: new Element('[automation="dispatchMappingsFormFieldVersion"]'), 

 }; 
 module.exports = elements;