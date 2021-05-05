const { Element, Brow } = require('cx-automation-utils/src/pageObject.js');
const Elem = require('../pageObjects/webElements');
const prepData = require('./index');
let dictionary = prepData.pages();
const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1)).toString().slice(0, 15);
const Api = require('./apiClass');

const commonBehavior = {
  login() {
    Brow.url(process.env.URI ? process.env.URI : process.ENV.URL);
    Elem.email.waitForVisible();
    Elem.email.setValue(process.ENV.userName);
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
  checkLogin(entity) {
    if (!Elem.entityTableColumnSelectionBtn.isExisting()) {//Perform login if not logged in.
      process.env.wdioRetries = parseInt(process.env.wdioRetries) + 1;
      dictionary = prepData.pages(process.env.wdioRetries);
      Brow.refresh();
      if(!Elem.selectTenantButton.isVisible()){
        this.login();
      }
      this.chooseTenant();
      this.navigationMainBar(entity);
    }
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
    this.waitForLoader();
    console.log("--end navigation---")
  },
  insertDataTextValues(parameter, param, entity, actionType) {
    // for some reason clearElement is kind of broken in the following entity pages during update 
    const customEntities = ['Reason List', 'Transfer List', 'Disposition List', 'User', 'Sla', 'Tenant'];
    if (customEntities.includes(entity) && actionType === 'update') {
      Brow.pause(1000);
      Elem[param].waitAndClick();
      Brow.pause(1000);
    }
    Elem[param].waitForVisible();
    Elem[param].waitForEnabled();
    Elem[param].clearElement();
    Elem[param].setValue(parameter[param]);
  },
  insertListValues(parameter, param) {
    Brow.pause(2000);
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
    const customEntities = ['Skill', 'Reason', 'Disposition', 'Sla', 'Tenant'];
    if (customEntities.includes(entity)) {
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
    Brow.pause(2000);
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
    this.performEntitySpecificAction(entity,'filter');
    columnElement.clearElement();
    Brow.pause(1000);
    columnElement.setValue(searchValue);
    new Element(`.//span[text()="${searchValue}"]`).waitAndClick();
    if (entity !== "Chat Widget" && entity !== "Email Template") {
      Elem.sdpanelStatusToggle.waitForVisible();
      Elem.sdpanelStatusToggle.validateElementsState('isVisible', true);
    }
    this.waitForLoader();
  },
  fillFormFields(parameter, entity, actionType) {
    Object.keys(parameter).forEach(param => {
      if (param.endsWith('Input')) {
        this.insertDataTextValues(parameter, param, entity, actionType);
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
    const draftEntityFormParams = dictionary[entity].specs[actionType].draftEntityParametersToInsert;
    const subEntityFormParams = dictionary[entity].specs[actionType].subEntityParametersToInsert;
    const subEntityToAddThenRemove = dictionary[entity].specs[actionType].subEntityToAddAndRemove;
    if (actionType === 'create') {
      this.draftEntity(draftEntityFormParams, entity, actionType);
      if (subEntityFormParams) {
        subEntityFormParams.forEach(parameter => {
          if (entity !== "Business Hour") {
           Elem.sdpanelAddItem.waitAndClick();
          }
          this.fillFormFields(parameter, entity, actionType);
          if (entity !== 'Sla' && entity !== "Business Hour") {
            Elem.modalSubmitButton.waitAndClick();
          }
        });
      }
      // for some reason when pause and scroll is not implemented sometimes after the submit it will cause the page to clear
      const customEntities = ['List','Flow'];
      if (customEntities.includes(entity)) {
        Brow.pause(1000);
        $('button[data-automation="sdpanelSubmitButton"]').scroll();
        Brow.pause(1000);
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
        }else if (entity === 'Contact Layout') {
          let updateButton = new Element(`button[data-automation="updateCategoryButton"]`, 1)
          updateButton.waitAndClick();
          subEntityFormParams.forEach(parameter => this.fillFormFields(parameter, entity));
          Elem.modalSubmitButton.waitAndClick();
          Brow.pause(1000);
          Elem.sdpanelSubmitButton.waitForVisible();
          Elem.sdpanelSubmitButton.waitAndClick();
        } else if (entity === 'Business Hour') {
          Elem.sdpanelAddItem.waitAndClick();
          Elem.dateDatePicker.waitForVisible();
          Elem.dateDatePicker.waitAndClick();
          const tomorrowDatePicker = new Element(`div[class="DayPicker-Day"][aria-label="${tomorrow}"]`);
          Brow.pause(2000);
          if (!tomorrowDatePicker.isVisible()) {
            Elem.dayPickerCalenderNextButton.waitAndClick();
          }
          tomorrowDatePicker.waitAndClick();
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
    this.waitForLoader();
  },
  createEntityViaAPI(entity) {
    try {
      if (entity === 'Chat Widget') {
        Api.createChatWidgetApp('Chat Widget Automation App', process.ENV.tenantId);
      }
    } catch (err) {
      throw new Error('Could not create entity via api due to ' + err);
    }
  },
  createEntity(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach(parameter => {
      Elem.entityCreateButton.waitAndClick();
      this.performEntitySpecificAction(entity);
      Elem.sdpanelSubmitButton.waitForVisible();
      this.submitFormData(entity, actionType, parameter);
      this.verifyAction(entity, actionType);
      if(entity === 'Flow'){
        this.closeToastr(entity, actionType);
        Brow.pause(3000)
        this.navigationMainBar(entity);
        Brow.pause(3000)
      }else if(entity === 'Business Hour'){
        this.closeAllToastr();
        Elem.sdpanelCancelButton.waitAndClick();
      }else{
        this.closeToastr(entity, actionType);
        this.verifyEntitySpecificAction(entity);
        this.closeSidePanel(entity);
      }
    });
  },
  updateEntity(entity, actionType) {
    dictionary[entity].specs[actionType].parametersToInsert.forEach((parameter, index) => {
      this.searchByNameAndClick(entity, dictionary[entity].updateSearchValue[index]);
      if (entity === 'Flow') {
        let flowId = Brow.getUrl().split('?id=').pop();
        try {
          Api.createFlowVersion(flowId);
          Brow.pause(1000);
          this.closeSidePanel(entity);
          this.searchByNameAndClick(entity, dictionary[entity].updateSearchValue[index]);  
        } catch(err){
          throw new Error('Could not create flow version via api due to ' + err);
        }
        Brow.pause(2000);
        this.closeSidePanel(entity);
        this.searchByNameAndClick(entity, dictionary[entity].updateSearchValue[index]);
      }
      this.submitFormData(entity, actionType, parameter);
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
      if (entity === 'Tenant') {
        Elem.resetBrandingButton.waitAndClick();
        Elem.confirmationWrapper.waitForVisible();
        Elem.confirmButton.waitAndClick();
        Elem.confirmationWrapper.waitForVisible(30000, false);
        Elem.toastSuccessMessage.waitForVisible();
        Elem.toastSuccessMessage.validateElementsString('exact', 'Branding has been reset to default successfully!');
        this.closeToastr(entity, actionType);
      }
      if(entity !== 'Business Hour'){
        this.toggleEntity(entity);
        this.closeSidePanel(entity);
        this.revertUpdate(entity, actionType);
      }
    });
  },
  addExtension(entity, actionType, type, ext, pos) {
    let extensionList = new Element(`select[data-automation="extensionList"]`, (pos)),
      extensionInput = new Element(`input[data-automation="extensionInput"]`, (pos - 1)),
      extensionLabelInput = new Element(`input[data-automation="extensionLabelInput"]`, (pos));

    Elem.sdpanelAddItem.waitAndClick();
    extensionList.waitForVisible();
    extensionInput.waitForVisible();
    extensionLabelInput.waitForVisible();
    extensionList.selectDropDownValue('byVisibleText', type);
    extensionInput.clearElement();
    extensionInput.setValue(ext);
    extensionLabelInput.clearElement();
    extensionLabelInput.setValue(type + ' extension');
    Elem.labelRequiredText.waitForVisible(20000, false);
    Elem.extensionRequiredText.waitForVisible(20000, false);
    Elem.sdpanelSubmitButton.waitAndClick();
    this.verifyAction(entity, actionType);
    this.closeToastr(entity, actionType);
  },
  draftEntity(draftEntityFormParams, entity, actionType){
    if(draftEntityFormParams){//continue draft
      Elem.sdpanelSubmitButton.waitAndClick();
      Brow.pause(1000);
      draftEntityFormParams.forEach(parameter => {
        this.fillFormFields(parameter, entity, actionType);
        if (entity === "Business Hour") {
          $('button[data-automation="btnSaveAndPublish"]').scroll();
          Brow.pause(1000);
          $('button[data-automation="btnSaveAndPublish"]').click();
        }
      });
    }
  },
  addRemoveSubEntity(parameter, param, entity, actionType) {
    if (entity === 'User' && Elem.sdpanelAddItem.isExisting()) {
      this.addExtension(entity, actionType, 'PSTN', dictionary[entity].userPSTNNumber, 1);
      this.addExtension(entity, actionType, 'SIP', dictionary[entity].userSIPAddress, 2);
      Elem.externalIdInput.clearElement();
      Elem.externalIdInput.setValue('12345');
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
  deleteEntityViaAPI(entity) {
    try {
      if (entity === 'Chat Widget') {
        let integrations = Api.getChatWebIntegrations(process.ENV.tenantId);
        Api.deleteAllSmoochAutomationWebIntegrations(integrations);
        let apps = Api.getChatWidgetApps(process.ENV.tenantId);
        Api.deleteAllSmoochAutomationApps(apps);
      }else if(entity === 'Whatsapp Integration') {
        const integrations = Api.getWhatsAppIntegrations(process.ENV.tenantId);
        Api.deleteAllSmoochAutomationWhatsAppIntegrations(integrations);
      }
    } catch (err) {
      throw new Error('Could not delete entity via api due to ' + err);
    }
  },
  deleteEntity(entity, actionType) {
    this.waitForLoader();
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
    if (actionType === 'deleteBeforeAPI') {
      this.deleteEntityViaAPI(entity, actionType);
    } else if (actionType === 'createAPI') {
      this.createEntityViaAPI(entity, actionType);
    } else if (actionType === 'create') {
      this.createEntity(entity, actionType);
    } else if (actionType === 'update') {
      this.updateEntity(entity, actionType);
    } else if (actionType === 'delete') {
      this.deleteEntity(entity, actionType);
    } else if (actionType === 'deleteAfterAPI') {
      this.deleteEntityViaAPI(entity, actionType);
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
    } else if (entity === 'Business Hour' && actionType === 'create') {
      Elem.toastSuccessMessage.validateElementsString('exact', `Draft was updated successfully!`);
    }else if (entity === 'Business Hour' && actionType === 'exception') {
      Elem.toastSuccessMessage.validateElementsString('exact', `Exception was created successfully!`);
    } else if (entity === 'Tenant') {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was ${actionType}d successfully!`);
      Elem.toastSuccessMessageTwo.validateElementsString('exact', `Branding has been ${actionType}d successfully!`);
      if (Elem.toastCloseButtonTwo.isVisible) {
        Elem.toastCloseButtonTwo.waitAndClick();
      }
    }else {
      Elem.toastSuccessMessage.validateElementsString('exact', `${entity} was ${actionType}d successfully!`);
    }
  },
  performEntitySpecificAction(entity,action=null){
    if(entity === 'Contact Layout' || entity === "Business Hour"){
      if(action){
        Elem.searchStatusColumnButton.waitAndClick();
        Elem.searchStatusColumnButton.selectDropDownValue('byVisibleText', 'All');
      }
      else if(entity !== "Business Hour" && !Elem.createListItemButton.isExisting()){
        Elem.entityCreateButton.waitAndClick();
        Elem.createListItemButton.waitForEnabled(3000);
      }
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
    if (entity !== 'Email Template' && entity !== 'Chat Widget') {
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
  closeAllToastr() {
    while (Elem.toastCloseButton.isVisible()) {
      Elem.toastCloseButton.waitAndClick();
      Brow.pause(500);
    }
  },
  closeSidePanel(entity) {
    Elem.sdpanelCloseButton.waitForVisible(30000, true);
    Elem.sdpanelCloseButton.waitAndClick();
    Elem.sdpanelSubmitButton.waitForVisible(30000, false);
    Elem.sdpanelSubmitButton.validateElementsState('isVisible', false);
  },
  revertUpdate(entity, actionType) {
    if (entity === 'Email Template') {
      var columnElement = new Element(`.//span[text()="${dictionary[entity].updateSearchValue}"]`);
      columnElement.waitForVisible(30000, true);
      columnElement.waitAndClick();
      Elem.emailList.selectDropDownValue('byVisibleText', 'Default Email');
      Elem.sdpanelSubmitButton.waitForVisible(30000, true);
      Elem.sdpanelSubmitButton.waitAndClick();
      this.verifyAction(entity, actionType);
      this.closeToastr(entity, actionType);
    }
  },
  waitForLoader(){
    if (Elem.loadingSpinnerIcon.isExisting()) {
      Elem.loadingSpinnerIcon.waitForVisible(30000, false);
      Elem.loadingSpinnerIcon.validateElementsState('isVisible', false);
    }
  },
  logout() {
    Brow.refresh();
    // Elem.selectTenantButton.waitForVisible();
    // Elem.selectTenantButton.validateElementsState('isVisible', true);
  }
};

module.exports = commonBehavior;
