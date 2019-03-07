const {Element} = require('cx-automation-utils/pageObject'); 
const elements = { 
usersBulkActionsFormFieldStatus: new Element('[automation="usersBulkActionsFormFieldStatus"]'), 
usersBulkActionsFormFieldInviteNow: new Element('[automation="usersBulkActionsFormFieldInviteNow"]'), 
usersBulkActionsFormFieldResendInvitation: new Element('[automation="usersBulkActionsFormFieldResendInvitation"]'), 
usersBulkActionsFormFieldCancelInvitation: new Element('[automation="usersBulkActionsFormFieldCancelInvitation"]'), 
usersBulkActionsFormFieldPasswordReset: new Element('[automation="usersBulkActionsFormFieldPasswordReset"]'), 
usersBulkActionsFormFieldNoPassword: new Element('[automation="usersBulkActionsFormFieldNoPassword"]'), 
usersBulkActionsFormFieldDefaultIdentityProvider: new Element('[automation="usersBulkActionsFormFieldDefaultIdentityProvider"]'), 
usersBulkActionsAddGroup: new Element('[automation="usersBulkActionsAddGroup"]'), 
usersBulkActionsRemoveGroup: new Element('[automation="usersBulkActionsRemoveGroup"]'), 
usersBulkActionsAddSkill: new Element('[automation="usersBulkActionsAddSkill"]'), 
usersBulkActionsRemoveSkill: new Element('[automation="usersBulkActionsRemoveSkill"]'), 

 }; 
 module.exports = elements;