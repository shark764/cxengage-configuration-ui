const { Element, Brow } = require('cx-automation-utils/src/pageObject.js');
const Elem = require('../pageObjects/webElements');
const dictionary = require('./index');

const commonBehavior = {
  login() {
    Brow.url(process.env.URI ? process.env.URI : process.ENV.URL);
    Elem.username.waitForVisible();
    Elem.username.setValue(process.ENV.userName);
    Elem.password.waitForVisible();
    Elem.password.setValue(process.ENV.password);
    Elem.signInButton.waitAndClick();
    Elem.selectTenantButton.waitForVisible();
    Elem.selectTenantButton.validateElementsState('isVisible', true);
  },
  chooseTenant() {
    // Elem.chooseTenantInput.waitForVisible();
    // Elem.chooseTenantInput.moveToObject();
    // Elem.chooseTenantInput.waitAndClick();
    // let tenantName = new Element(`.//div[text()="${process.ENV.tenantName}"]`);
    // tenantName.moveToObject();
    // tenantName.waitAndClick();
    // tenantName.waitForVisible(30000, false);
    Elem.selectTenantButton.waitAndClick();
    Elem.loadingSpinnerIcon.waitForVisible(30000, false);
    Elem.loadingSpinnerIcon.validateElementsState('isVisible', false);
  },
  navigationMainBar(entity) {
    let navBar = new Element(`[data-automation=${dictionary[entity].navigation.mainBar}]`);
    let navBarSub = new Element(`[data-automation=${dictionary[entity].navigation.subMainBar}]`);
    navBar.waitAndClick();
    navBarSub.waitAndClick();
    Elem.entityCreateButton.waitForVisible();
    Elem.entityCreateButton.validateElementsState('isVisible', true);
    Elem.entityCreateButton.waitForEnabled();
    Elem.entityCreateButton.validateElementsState('isEnabled', true);
  },
  insertDataTextValues(parameter, param) {
    Elem[param].waitForVisible();
    Elem[param].waitForEnabled();
    Elem[param].setValue(parameter[param]);
  },
  insertListValues(parameter, param) {
    if (typeof parameter[param] === "number") {
      Elem[param].selectDropDownValue('byIndex', parameter[param]);
    } else {
      Elem[param].selectDropDownValue('byVisibleText', parameter[param]);
    }
    let loadingIcon = new Element('.//option[text()="Loading..."]');
    if (loadingIcon.isExisting()) {
      loadingIcon.waitForVisible(30000, false);
      loadingIcon.validateElementsState('isVisible', false);
    }
  },
  insertToggleValues(parameter, param) {
    Elem[param].waitAndClick();
    Elem.confirmationWrapper.waitForVisible();
    Elem.confirmButton.waitAndClick();
    Elem.confirmationWrapper.waitForVisible(30000, false);
    Elem.detailsPanelAlertText.waitForVisible();
    Elem.detailsPanelAlertText.validateElementsState('isVisible', true);
  },
  insertAutoCompleteValues(parameter, param) {
    let autoCompleteInput = new Element(`input${Elem[param].selector}`);
    autoCompleteInput.waitAndClick();
    autoCompleteInput.setValue(parameter[param]);
    let autoCompleteValue = new Element(`.//li[text()="${parameter[param]}"]`);
    autoCompleteValue.waitAndClick();
  },
  insertRadioValues(parameter, param) {
    let radioGroupValue = new Element(`input[value="${parameter[param]}"]`);
    radioGroupValue.waitAndClick();
  },
  insertExtraValues(parameter, param) {
    Elem[param].setValue(parameter[param]);
  },
  searchByNameAndClick(entity, actionType) {
    var columnElement = new Element(`[data-automation="${dictionary[entity].whichCatagoryToSearch}"]`);
    columnElement.clearElement();
    if (actionType === 'createVersion' || actionType === 'update') {
      columnElement.setValue(dictionary[entity].updateSearchValue);
      let searchedForElement = new Element(`.//span[text()="${dictionary[entity].updateSearchValue}"]`);
      searchedForElement.waitAndClick();
    }
    if (actionType === 'delete') {
      columnElement.setValue(dictionary[entity].deleteSearchValue);
      let searchedForElement = new Element(`.//span[text()="${dictionary[entity].deleteSearchValue}"]`);
      searchedForElement.waitAndClick();
    }
    if (entity === 'Sla') { // To Fix
      Elem.sdpanelAddItem.waitForVisible(30000, true);
      Elem.sdpanelAddItem.validateElementsState('isVisible', true);
    } else {
      Elem.sdpanelSubmitButton.waitForVisible(30000, true);
      Elem.sdpanelSubmitButton.validateElementsState('isVisible', true);
    }
  },
  submitFormData(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach(parameter => {
      Object.keys(parameter).forEach(param => {
        if (param.endsWith('Input')) {
          this.insertDataTextValues(parameter, param)
        } else if (param.endsWith('List')) {
          this.insertListValues(parameter, param);
        } else if (param.endsWith('Radio')) {
          this.insertRadioValues(parameter, param);
        } else if (param.endsWith('AutoComplete')) {
          this.insertAutoCompleteValues(parameter, param);
        } else if (param.endsWith('Toggle')) {
          this.insertToggleValues(parameter, param);
        } else {
          this.insertExtraValues(param);
        }
      });
    });
    if (actionType === 'createVersion') {
      Elem.modalSubmitButton.waitForVisible();
      Elem.modalSubmitButton.waitAndClick();
    } else {
      Elem.sdpanelSubmitButton.waitForEnabled();
      Elem.sdpanelSubmitButton.waitAndClick();
    }
  },
  inputFormDataForModal(entity, actionType) {
    if(entity === 'Sla' && actionType === 'createVersion'){
      Elem.modalNameInput.setValue('versionSLAName');
      Elem.modalDescriptionInput.setValue('versionSLADescription');
    }
  },
  entityCRUD(entity, actionType) {
    if (actionType === 'create') {
      Elem.entityCreateButton.waitAndClick();
      Elem.sdpanelSubmitButton.waitForVisible();
      this.submitFormData(entity, actionType);
      this.verifyAction(entity, actionType);
      this.verifyEntitySpecificAction(entity);
      this.closeSidePanel();
    } else if (actionType === 'createVersion') {
      Elem.searchStatusColumnButton.waitAndClick();
      Elem.searchStatusColumnButton.selectDropDownValue('byVisibleText', 'All');
      this.searchByNameAndClick(entity, actionType);
      Elem.sdpanelAddItem.waitAndClick();
      Elem.thresholdInput.waitForVisible(30000, true);
      this.inputFormDataForModal(entity, actionType);
      this.submitFormData(entity, actionType);
      this.verifyAction(entity, actionType);
      this.verifyEntitySpecificAction(entity);
      this.closeSidePanel();
    } else if (actionType === 'update') {
      this.searchByNameAndClick(entity, actionType);
      this.submitFormData(entity, actionType);
      this.verifyAction(entity, actionType);
      this.toggleEntity(entity);
      this.closeSidePanel();
    } else if (actionType === 'delete') {
      Elem.searchStatusColumnButton.waitAndClick();
      Elem.searchStatusColumnButton.selectDropDownValue('byVisibleText', 'All');
      this.searchByNameAndClick(entity, actionType);
      Elem.deleteKeyButton.waitAndClick();
      Elem.confirmButton.waitAndClick();
      this.verifyAction(entity, actionType);
    }
  },
  verifyAction(entity, actionType) {
    Elem.toastSuccessMessage.waitForVisible();
    Elem.toastSuccessMessage.validateElementsState('isVisible', true);
    if(actionType === ('create' || 'update' || 'delete')) {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was ${actionType}d successfully!`);
    }
    this.closeToastr(entity, actionType);
  },
  verifyEntitySpecificAction(entity) {
    if (entity === 'Api Key') {
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmationWrapper.validateElementsState('isVisible', true);
      Elem.cancelButton.waitAndClick();
      Elem.showPasswordButton.waitForVisible();
      Elem.keyIdInput.waitForVisible();
      Elem.deleteKeyButton.waitForVisible();
      Elem.deleteKeyButton.validateElementsState('isVisible', true);
    }
  },
  toggleEntity(entity) {
    Elem.sdpanelStatusToggle.waitAndClick();
    Elem.confirmationWrapper.waitForVisible();
    Elem.confirmButton.waitForVisible();
    let enabledToggle = Elem.enableMessage.isExisting();
    Elem.confirmButton.waitAndClick();
    Elem.toastSuccessMessage.waitForVisible();
    Elem.toastSuccessMessage.validateElementsState('isVisible', true);
    if(enabledToggle === true) {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was enabled successfully!`);
    } else {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was disabled successfully!`);
    }
    this.closeToastr(entity);
  },
  closeToastr(entity, actionType) {
    if (Elem.toastCloseButton.isVisible()) {
      Elem.toastCloseButton.waitAndClick();
      if(entity === 'User' && actionType === 'create') {
        let userCreatedToastr = new Element(`.//div[text()="User was created successfully!"]`);
        userCreatedToastr.waitForVisible(30000, false);
        Elem.toastCloseButton.waitAndClick();
      }
      Elem.toastCloseButton.waitForVisible(30000, false);
      Elem.toastCloseButton.validateElementsState('isVisible', false);
    }
  },
  closeSidePanel() {
    Elem.sdpanelCloseButton.waitForVisible(30000, true);
    Elem.sdpanelCloseButton.waitAndClick();
    Elem.sdpanelSubmitButton.waitForVisible(30000, false);
    Elem.sdpanelSubmitButton.validateElementsState('isVisible', false);
  },
  logout() {
    Brow.refresh();
    Elem.selectTenantButton.waitForVisible();
    Elem.selectTenantButton.validateElementsState('isVisible', true);
  }
};

module.exports = commonBehavior;
