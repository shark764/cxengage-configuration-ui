const { Element } = require('cxautomationutils/pageObject');
const elements = {
  username: new Element('[automation="username"]'),
  password: new Element('[automation="password"]'),
  signInButton: new Element('[automation="signInButton"]'),
  tenantSelect: new Element('[automation="tenantSelect"]'),
  chooseTenantButton: new Element('[automation="chooseTenantButton"]'),
  loading: new Element('[automation="loading"]'),
  flowsFormFieldName: new Element('[automation="flowsFormFieldName"]'),
  flowsFormFieldDescription: new Element('[automation="flowsFormFieldDescription"]'),
  flowsFormFieldType: new Element('[automation="flowsFormFieldType"]'),
  flowsFormFieldActiveVersion: new Element('[automation="flowsFormFieldActiveVersion"]'),
  transferListsNameInput: new Element('[automation="transferListsNameInput"]'),
  transferListsDescriptionInput: new Element('[automation="transferListsDescriptionInput"]'),
  flowsCopyFormFieldName: new Element('[automation="flowsCopyFormFieldName"]'),
  flowsCopyFormFieldDescription: new Element('[automation="flowsCopyFormFieldDescription"]'),
  usersBulkActionsFormFieldStatus: new Element('[automation="usersBulkActionsFormFieldStatus"]'),
  usersBulkActionsFormFieldInviteNow: new Element('[automation="usersBulkActionsFormFieldInviteNow"]'),
  usersBulkActionsFormFieldResendInvitation: new Element('[automation="usersBulkActionsFormFieldResendInvitation"]'),
  usersBulkActionsFormFieldCancelInvitation: new Element('[automation="usersBulkActionsFormFieldCancelInvitation"]'),
  usersBulkActionsFormFieldPasswordReset: new Element('[automation="usersBulkActionsFormFieldPasswordReset"]'),
  usersBulkActionsFormFieldNoPassword: new Element('[automation="usersBulkActionsFormFieldNoPassword"]'),
  usersBulkActionsFormFieldDefaultIdentityProvider: new Element(
    '[automation="usersBulkActionsFormFieldDefaultIdentityProvider"]'
  ),
  dispatchMappingsFormFieldName: new Element('[automation="dispatchMappingsFormFieldName"]'),
  dispatchMappingsFormFieldDescription: new Element('[automation="dispatchMappingsFormFieldDescription"]'),
  dispatchMappingsFormFieldChannelType: new Element('[automation="dispatchMappingsFormFieldChannelType"]'),
  dispatchMappingsFormFieldInteractionField: new Element('[automation="dispatchMappingsFormFieldInteractionField"]'),
  dispatchMappingsFormFieldValue: new Element('[automation="dispatchMappingsFormFieldValue"]'),
  dispatchMappingsFormFieldFlowId: new Element('[automation="dispatchMappingsFormFieldFlowId"]')
};
module.exports = elements;
