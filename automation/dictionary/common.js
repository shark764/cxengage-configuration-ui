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
    Elem.entityTableColumnSelectionBtn.waitForVisible();
    Elem.entityTableColumnSelectionBtn.validateElementsState('isVisible', true);
    Elem.entityTableColumnSelectionBtn.waitForEnabled();
    Elem.entityTableColumnSelectionBtn.validateElementsState('isEnabled', true);
  },
  insertDataTextValues(parameter, param) {
    Elem[param].waitForVisible();
    Elem[param].waitForEnabled();
    Elem[param].clearElement();
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
  insertToggleValues(parameter, param, entity) {
    Elem[param].waitAndClick();
    if (entity === 'Skill' || entity === 'Reason' || entity === 'Sla') {
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible(30000, false);
    }
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
  insertCheckboxValues(parameter, param) {
    Elem[param].waitAndClick();
    Elem.checkboxMenuWrapper.waitForVisible();
    parameter[param].input.forEach(x => new Element(`[data-automation="${x}"]`).waitAndClick());
    Elem.modalMask.waitAndClick();
    Elem.checkboxMenuWrapper.waitForVisible(30000, false);
    new Element(`button[data-automation="${param}"] span`).waitForVisible();
    new Element(`button[data-automation="${param}"] span`).validateElementsString('exact', parameter[param].value);
  },
  searchByNameAndClick(entity, searchValue) {
    var columnElement = new Element(`[data-automation="${dictionary[entity].whichCatagoryToSearch}"]`);
    columnElement.clearElement();
    columnElement.setValue(searchValue);
    new Element(`.//span[text()="${searchValue}"]`).waitAndClick();
    Elem.sdpanelStatusToggle.waitForVisible();
    Elem.sdpanelStatusToggle.validateElementsState('isVisible', true);
  },
  fillFormFields(parameter, entity) {
    Object.keys(parameter).forEach(param => {
      if (param.endsWith('Input')) {
        this.insertDataTextValues(parameter, param)
      } else if (param.endsWith('List')) {
        this.insertListValues(parameter, param);
      } else if (param.endsWith('Toggle')) {
        this.insertToggleValues(parameter, param, entity);
      } else if (param.endsWith('Checkbox')) {
        this.insertCheckboxValues(parameter, param);
      } else if (param.endsWith('Radio')) {
        this.insertRadioValues(parameter, param);
      } else if (param.endsWith('AutoComplete')) {
        this.insertAutoCompleteValues(parameter, param);
      }
    });
  },
  submitFormData(entity, actionType, parameter) {
    this.fillFormFields(parameter, entity);
    const subEntityFormParams = dictionary[entity].specs[actionType].subEntityParametersToInsert;
    if (actionType === 'create') {
      if (subEntityFormParams) {
        subEntityFormParams.forEach(parameter => {
          Elem.sdpanelAddItem.waitAndClick();
          this.fillFormFields(parameter, entity);
          if (entity !== 'Sla') {
            Elem.modalSubmitButton.waitAndClick();
          }
        });
      }
      Elem.sdpanelSubmitButton.waitAndClick();
    } else if (actionType === 'update') {
      if (subEntityFormParams) {
        if (entity === 'Reason List') {
          Elem.updateCategoryButton.waitAndClick();
        } else if (entity === 'Transfer List') {
          Elem.updateListItemButton.waitAndClick();
        }
        subEntityFormParams.forEach(parameter => this.fillFormFields(parameter, entity));
        Elem.modalSubmitButton.waitAndClick();
      } else {
        $('button[data-automation="sdpanelSubmitButton"]').scroll();
        Elem.sdpanelSubmitButton.waitAndClick();
      }
    }
  },
  createEntity(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach(parameter => {
      Elem.entityCreateButton.waitAndClick();
      Elem.sdpanelSubmitButton.waitForVisible();
      this.submitFormData(entity, actionType, parameter);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      this.verifyEntitySpecificAction(entity);
      this.closeSidePanel();
    });
  },
  updateEntity(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach((parameter, index) => {
      this.searchByNameAndClick(entity, dictionary[entity].updateSearchValue[index]);
      this.submitFormData(entity, actionType, parameter);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      this.toggleEntity(entity);
      this.closeSidePanel();
    });
  },
  deleteEntity(entity, actionType) {
    Elem.searchStatusColumnButton.waitAndClick();
    Elem.searchStatusColumnButton.selectDropDownValue('byVisibleText', 'All');
    this.searchByNameAndClick(entity, dictionary[entity].deleteSearchValue);
    if (entity === 'Reason List' || entity === 'Transfer List') {
      Elem.removeCategoryButton.waitForVisible();
      Elem.removeCategoryButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible(30000, false);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      Elem.removeListItemButton.waitForVisible();
      Elem.removeListItemButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible(30000, false);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      this.closeSidePanel();
    }
    if (entity === 'Api Key') {
      Elem.deleteKeyButton.waitAndClick();
      Elem.confirmButton.waitAndClick();
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
    }
  },
  entityCRUD(entity, actionType) {
    if (actionType === 'create') {
      this.createEntity(entity, actionType);
    } else if (actionType === 'update') {
      this.updateEntity(entity, actionType);
    } else if (actionType === 'delete') {
      this.deleteEntity(entity, actionType);
    }
  },
  verifyAction(entity, actionType) {
    Elem.toastSuccessMessage.waitForVisible();
    Elem.toastSuccessMessage.validateElementsState('isVisible', true);
    if ((entity === 'Reason List' || entity === 'Transfer List') && actionType === 'delete') {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was updated successfully!`);
    } else {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was ${actionType}d successfully!`);
    }
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
    if (enabledToggle === true) {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was enabled successfully!`);
    } else {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was disabled successfully!`);
    }
    this.closeToastr(entity);
  },
  closeToastr(entity, actionType) {
    if (Elem.toastCloseButton.isVisible()) {
      Elem.toastCloseButton.waitAndClick();
      if (entity === 'User' && actionType === 'create') {
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
