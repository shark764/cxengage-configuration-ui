const {Element} = require('cx-automation-utils/pageObject'); 
const elements = { 
usersBulkActionsFormFieldStatus: new Element('[automation="usersBulkActionsFormFieldStatus"]'), 
usersBulkActionsFormFieldInviteNow: new Element('[automation="usersBulkActionsFormFieldInviteNow"]'), 
usersBulkActionsFormFieldResendInvitation: new Element('[automation="usersBulkActionsFormFieldResendInvitation"]'), 
usersBulkActionsFormFieldCancelInvitation: new Element('[automation="usersBulkActionsFormFieldCancelInvitation"]'), 
usersBulkActionsFormFieldPasswordReset: new Element('[automation="usersBulkActionsFormFieldPasswordReset"]'), 
usersBulkActionsFormFieldNoPassword: new Element('[automation="usersBulkActionsFormFieldNoPassword"]'), 
usersBulkActionsFormFieldDefaultIdentityProvider: new Element('[automation="usersBulkActionsFormFieldDefaultIdentityProvider"]'), 
dispatchMappingsFormFieldName: new Element('[automation="dispatchMappingsFormFieldName"]'), 
dispatchMappingsFormFieldDescription: new Element('[automation="dispatchMappingsFormFieldDescription"]'), 
dispatchMappingsFormFieldChannelType: new Element('[automation="dispatchMappingsFormFieldChannelType"]'), 
dispatchMappingsFormFieldInteractionField: new Element('[automation="dispatchMappingsFormFieldInteractionField"]'), 
dispatchMappingsFormFieldValue: new Element('[automation="dispatchMappingsFormFieldValue"]'), 
dispatchMappingsFormFieldFlowId: new Element('[automation="dispatchMappingsFormFieldFlowId"]'), 

 }; 
 module.exports = elements;