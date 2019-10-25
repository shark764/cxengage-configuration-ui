const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('../pageObjects/webElements');
const dictionary = require('./index');

const commonBehavior = {
  login() {
    Brow.url(process.env.URL);
    Elem.username.waitForVisible();
    Elem.username.setValue(process.env.USERNAME);
    Elem.password.waitForVisible();
    Elem.password.setValue(process.env.PASSWORD);
    Elem.signInButton.waitAndClick();
    Elem.selectTenantButton.waitForVisible();
    Elem.selectTenantButton.validateElementsState('isVisible', true);
  },
  chooseTenant() {
    Elem.chooseTenantInput.waitForVisible();
    Elem.chooseTenantInput.moveToObject();
    Elem.chooseTenantInput.waitAndClick();
    let tenantName = new Element(`.//div[text()="${process.env.TENANT}"]`);
    tenantName.moveToObject();
    tenantName.waitAndClick();
    tenantName.waitForVisible(30000, false);
    Elem.selectTenantButton.waitAndClick();
    Elem.loadingSpinnerIcon.waitForVisible(30000, false);
    Elem.loadingSpinnerIcon.validateElementsState('isVisible', false);
  },
  navigationMainBar(entity) {
    let navBar = new Element(`[data-automation=${dictionary[entity].navigation.mainBar}]`);
    let navBarSub = new Element(`[data-automation=${dictionary[entity].navigation.subMainBar}]`);
    navBar.waitAndClick();
    navBarSub.waitAndClick();
    Elem.loadingSpinnerIcon.waitForVisible();
    Elem.loadingSpinnerIcon.waitForVisible(30000, false);
    Elem.loadingSpinnerIcon.validateElementsState('isVisible', false);
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
    Elem[param].setValue(parameter[param]);
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
    if (actionType === 'update') {
      columnElement.setValue(dictionary[entity].updateSearchValue);
      Elem.inActiveTableRow.waitAndClick();
    } if (actionType === 'delete') {
      columnElement.setValue(dictionary[entity].deleteSearchValue);
      Elem.activeTableRow.waitAndClick();
    }
    Elem.sdpanelSubmitButton.waitForVisible();
    Elem.sdpanelSubmitButton.validateElementsState('isVisible', true);
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
        } else if (param.endsWith('Auto')) {
          this.insertAutoCompleteValues(parameter, param);
        } else if (param.endsWith('Toggle')) {
          this.insertToggleValues(parameter, param);
        } else {
          this.insertExtraValues(param);
        }
      });
    });
    Elem.sdpanelSubmitButton.waitAndClick();
  },
  entityCRUD(entity, actionType) {
    if (actionType === 'create') {
      Elem.entityCreateButton.waitAndClick();
      Elem.sdpanelSubmitButton.waitForVisible();
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
    Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was ${actionType}d successfully!`);
    this.closeToastr();
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
    Elem.confirmButton.waitAndClick();
    Elem.toastSuccessMessage.waitForVisible();
    Elem.toastSuccessMessage.validateElementsState('isVisible', true);
    Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was disabled successfully!`);
    this.closeToastr();
  },
  closeToastr() {
    if (Elem.toastCloseButton.isVisible()) {
      Elem.toastCloseButton.waitAndClick();
      Elem.toastCloseButton.waitForVisible(30000, false);
      Elem.toastCloseButton.validateElementsState('isVisible', false);
    }
  },
  closeSidePanel() {
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
