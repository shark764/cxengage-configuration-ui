const { Element, Brow } = require('cx-automation-utils/src/pageObject.js');
const Elem = require('../pageObjects/webElements');
const dictionary = require('./index');
const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1)).toString().slice(0, 15);
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
    if (typeof parameter[param] === 'number') {
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
    if (entity === 'Skill' || entity === 'Reason' || entity === 'Disposition' || entity === 'Sla') {
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
  openSVGDropdown(param, entity) {
    if (Elem.sdpanelAddItem.isExisting()) {
      Elem[param].validateElementsState('isVisible', true);
    } else {
      Elem[param].waitAndClick();
      Elem.sdpanelAddItem.waitForVisible();
    }
  },
  searchByNameAndClick(entity, searchValue) {
    var columnElement = new Element(`[data-automation="${dictionary[entity].whichCatagoryToSearch}"]`);
    columnElement.clearElement();
    columnElement.setValue(searchValue);
    new Element(`.//span[text()="${searchValue}"]`).waitAndClick();
    Elem.sdpanelStatusToggle.waitForVisible();
    Elem.sdpanelStatusToggle.validateElementsState('isVisible', true);
  },
  fillFormFields(parameter, entity, actionType) {
    Object.keys(parameter).forEach(param => {
      if (param.endsWith('Input')) {
        this.insertDataTextValues(parameter, param);
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
      } else if (param.endsWith('SVG')) {
        this.addRemoveSubEntity(parameter, param, entity, actionType);
      }
    });
  },
  submitFormData(entity, actionType, parameter) {
    this.fillFormFields(parameter, entity, actionType);
    const subEntityFormParams = dictionary[entity].specs[actionType].subEntityParametersToInsert;
    const subEntityToAddThenRemove = dictionary[entity].specs[actionType].subEntityToAddAndRemove;
    if (actionType === 'create') {
      if (subEntityFormParams) {
        subEntityFormParams.forEach(parameter => {
          Elem.sdpanelAddItem.waitAndClick();
          this.fillFormFields(parameter, entity, actionType);
          if (entity !== 'Sla') {
            Elem.modalSubmitButton.waitAndClick();
          }
        });
      }
      Elem.sdpanelSubmitButton.waitAndClick();
    } else if (actionType === 'update') {
      if (subEntityToAddThenRemove) {
        subEntityToAddThenRemove.forEach(parameter => this.fillFormFields(parameter, entity, actionType));
      }
      if (subEntityFormParams) {
        if (entity === 'Reason List' || entity === 'Disposition List') {
          Elem.updateCategoryButton.waitAndClick();
          subEntityFormParams.forEach(parameter => this.fillFormFields(parameter, entity));
          Elem.modalSubmitButton.waitAndClick();
        } else if (entity === 'Transfer List') {
          Elem.updateListItemButton.waitAndClick();
          subEntityFormParams.forEach(parameter => this.fillFormFields(parameter, entity));
          Elem.modalSubmitButton.waitAndClick();
        } else if (entity === 'Business Hour') {
          Elem.sdpanelAddItem.waitAndClick();
          Elem.dateDatePicker.waitForVisible();
          Elem.dateDatePicker.waitAndClick();
          new Element(`div[class="DayPicker-Day"][aria-label="${tomorrow}"]`).waitForVisible();
          new Element(`div[class="DayPicker-Day"][aria-label="${tomorrow}"]`).waitAndClick();
          subEntityFormParams.forEach(parameter => this.fillFormFields(parameter, entity));
          Elem.modalSubmitButton.waitAndClick();
          this.verifyAction(entity, 'exception');
          this.closeToastr();
          Elem.sdpanelSubmitButton.waitAndClick();
        }
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
      this.closeSidePanel(entity);
    });
  },
  updateEntity(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach((parameter, index) => {
      this.searchByNameAndClick(entity, dictionary[entity].updateSearchValue[index]);
      this.submitFormData(entity, actionType, parameter);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      this.toggleEntity(entity);
      this.closeSidePanel(entity);
      this.revertUpdate(entity, actionType);
    });
  },
  addRemoveSubEntity(parameter, param, entity, actionType) {
    if (entity === 'User' && Elem.sdpanelAddItem.isExisting()) {
      Elem.extensionsSVG.waitAndClick();
      Elem.sdpanelAddItem.waitForVisible(20000, false);
    }
    if (entity !== 'Role' && entity !== 'Outbound Identifier List' && entity !== 'Business Hour') {
      this.openSVGDropdown(param, entity);
    }
    Elem.sdpanelAddItem.waitAndClick();
    Elem.dtpanelActionAddItem.waitForVisible();
    Elem.dtpanelActionAddItem.waitAndClick();
    Elem.loadingSpinnerIcon.waitForVisible();
    Elem.loadingSpinnerIcon.waitForVisible(20000, false);
    this.verifyAction(entity, actionType);
    this.closeToastr(entity, actionType);
    Elem.dtpanelActionClose.waitAndClick();
    Elem.dtpanelActionRemoveItem.waitAndClick();
    Elem.loadingSpinnerIcon.waitForVisible();
    Elem.loadingSpinnerIcon.waitForVisible(20000, false);
    this.verifyAction(entity, actionType);
    this.closeToastr(entity, actionType);

    if (entity !== 'Role' && entity !== 'Outbound Identifier List') {
      Elem[param].waitAndClick();
      Elem.sdpanelAddItem.waitForVisible(20000, false);
    }
  },
  deleteEntity(entity, actionType) {
    Elem.searchStatusColumnButton.waitAndClick();
    Elem.searchStatusColumnButton.selectDropDownValue('byVisibleText', 'All');
    this.searchByNameAndClick(entity, dictionary[entity].deleteSearchValue);
    if (entity === 'Reason List' || entity === 'Transfer List' || entity === 'Disposition List') {
      Elem.removeCategoryButton.waitForVisible();
      Elem.removeCategoryButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible(30000, false);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      Elem.removeCategoryButton.waitForVisible();
      Elem.removeListItemButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible();
      Elem.confirmButton.waitAndClick();
      Elem.confirmationWrapper.waitForVisible(30000, false);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      this.closeSidePanel(entity);
    }
    if (entity === 'Api Key') {
      Elem.deleteKeyButton.waitAndClick();
      Elem.confirmButton.waitAndClick();
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
    }
    if (entity === 'Business Hour') {
      Elem.dtpanelActionRemoveItem.waitAndClick();
      Elem.confirmButton.waitAndClick();
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
    if (
      (entity === 'Reason List' ||
        entity === 'Transfer List' ||
        entity === 'Disposition List' ||
        entity === 'Role' ||
        entity === 'Business Hour') &&
      actionType === 'delete'
    ) {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was updated successfully!`);
    } else if (entity === 'Business Hour' && actionType === 'exception') {
      Elem.toastSuccessMessage.validateElementsString('exact', `Exception was created successfully!`);
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
    if (entity !== "Email Template"){
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
    }
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
  closeSidePanel(entity) {
    Elem.sdpanelCloseButton.waitForVisible(30000, true);
    Elem.sdpanelCloseButton.waitAndClick();
    // Temporary workaround due to CXV1-21326
    if (entity === "Email Template") {
      Elem.confirmButton.waitForVisible(30000, true);
      Elem.confirmButton.waitAndClick();
    }
    Elem.sdpanelSubmitButton.waitForVisible(30000, false);
    Elem.sdpanelSubmitButton.validateElementsState('isVisible', false);
  },
  revertUpdate(entity, actionType){
    if (entity === 'Email Template') {
      var columnElement = new Element(`.//span[text()="${dictionary[entity].updateSearchValue}"]`);
      console.log(columnElement);
      columnElement.waitForVisible(30000, true);
      columnElement.waitAndClick();
      Elem.emailList.selectDropDownValue('byVisibleText', 'Default Email');
      Elem.sdpanelSubmitButton.waitForVisible(30000, true);
      Elem.sdpanelSubmitButton.waitAndClick();
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      // Following due to CXV1-21326
      this.closeSidePanel(entity);
    }
  },
  logout() {
    Brow.refresh();
    // Elem.selectTenantButton.waitForVisible();
    // Elem.selectTenantButton.validateElementsState('isVisible', true);
  }
};

module.exports = commonBehavior;
