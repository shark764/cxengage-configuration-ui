const {Element, Brow} = require('cx-automation-utils/pageObject');
const Common = require('../common/index.js');
const uuid = require('uuid');
const MainPage = require('../main/index.js');


const ListsPage = {
	iframe: new Element('iframe[src="https://dev-config2.cxengagelabs.net/#/configuration/lists"]'),

	listItemName: uuid() + "Item",
	newListItemName: "New" + uuid(),
	randomNum: Math.floor(Math.random() * 100001),
	newRandomNum: Math.floor(Math.random() * 100001),

	// Search inputs
  	nameSearchInput: new Element('input[class="entity-table-filter-column-name"]'),
	linkToListsDocs: new Element('a[href="https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm"]'),
	configurationDropDown: new Element('dropdown[id="configurationDropConfig"]'),
	listsLink: new Element('li[id="lists-configuration-link"]'),

	// Create list panel
	selectListTypeDropDown: new Element('select[name="listTypeId"]'),
	createListButton:  new Element('button[id="sdpanel-create"]'),
	newListNameInput: new Element('input[name="name"]'),
	listTypeDispositionsCode: new Element('.//option[text()="Disposition Codes Type"]'),
	listTypeReasonCode: new Element('.//option[text()="Reason Codes Type"]'),
  	cancelButton:  new Element('button[id="sdpanel-cancel"]'),
  	submitButton:  new Element('button[id="sdpanel-submit"]'),
	closeButton:  new Element('div[id="sdpanel-close-panel"]'),

	// Edit list panel
	editListNameField:  new Element('input[id="frm-lists-name"]'),
	sharedToggle: new Element('label[id="frm-lists-shared"]'),
	description: new Element('input[id="frm-list-item-description"]'),
	plusButton: new Element('button[id="sdpanel-add-item"]'),
	submitButtonListItem:  new Element('button[id="sdpanel-submit"]',1),

	// Disposition list item values
	dispositionName: new Element('input[id="frm-list-item-dispositionName"]'),
	dispositionCode: new Element('input[id="frm-list-item-dispositionCode"]'),
	dispositionReasonListItemName: (listItemName) => new Element(`span[title="${listItemName}"]`),
	dispositionReasonListItemCode: (randomNum) => new Element(`span[title="${randomNum}"]`),
	newDispositionReasonListItemCode: (newRandomNum) => new Element(`span[title="${newRandomNum}"]`),
	editListItemButton: (listItemName) => new Element(`button[title="Update ${listItemName}"]`),
	removeListItemButton: (listItemName) => new Element(`button[title="Delete ${listItemName}"]`),
	dispositionCreateDescription: new Element('span[title="Disposition List Item Created Successfully"]'),
	dispositionUpdateDescription: new Element('span[title="Disposition List Item Edited Successfully"]'),

	// Reason list item values
  	reasonName : new Element('input[id="frm-list-item-reasonName"]'),
  	reasonCode : new Element('input[id="frm-list-item-reasonCode"]'),

  	disableListToggle : new Element('label[id="sdpanel-toggle-status"]'),
  	confirmButton : new Element('button[id="confirm"]'),
	dispositionNameLabel : new Element('span[title="Disposition Name"]'),
	dispositionCodeLabel : new Element('span[title="Disposition Code"]'),
	dispositionListItemNameInput : new Element('input[class="subentity-filter-column-dispositionName"]'),
	dispositionListItemCodeInput : new Element('input[class="subentity-filter-column-dispositionCode"]'),
	dispositionDescriptionLabel : new Element('span[title="Description"]'),
	dispositionActionLabel : new Element('div[class="rt-resizable-header-content"]'),
	listtypeDS : new Element('span[title="Disposition Codes Type"]'),
	dispositionMainList : new Element('span[title="Disposition Automation List"]'),
	reasonMainList : new Element('span[title="Reason Automation List"]'),
	listEnabled : new Element('div[class="rt-td"]Enabled'),
	listDisabled : new Element('div[class="rt-td"]Disabled'),  
	

	navigateToListPage: function(){
		this.configurationDropDown.waitAndClick();
		this.configurationDropDown.waitAndClick();
		this.listsLink.waitAndClick();
		this.iframe.switchToFrame();
		this.createListButton.waitForExist();
	},

	checkForExistingDispositionList: function(ListName){
		Brow.pause(5000); //fix this
		this.nameSearchInput.setValue(ListName);
		Brow.pause(3000);
		var booleanValue = this.dispositionMainList.isExisting();
		if ( booleanValue === true) {
			this.dispositionMainList.waitAndClick();
		} 
		else if (booleanValue === false){
			this.createListTypeDispositionsCode(ListName);
		}
		Brow.pause(3000);
	},

	createListTypeDispositionsCode: function(ListsName){
		this.createListButton.waitAndClick();
		this.newListNameInput.setValue(ListsName);
		this.selectListTypeDropDown.click();
		this.listTypeDispositionsCode.click();
		this.listTypeDispositionsCode.click();
		Brow.pause(2000);
		this.submitButton.click();
		Brow.pause(2000);
		this.dispositionNameLabel.validateElementsState('isExisting', true);
	},

	createListTypeReasonCodes: function(ListName){
		this.createListButton.waitAndClick();
		this.newListNameInput.setValue(ListName);
		this.selectListTypeDropDown.click();
		this.listTypeReasonCode.click();
		this.listTypeReasonCode.click();
		Brow.pause(2000);
		this.submitButton.click();
		Brow.pause(2000);
		this.dispositionNameLabel.validateElementsState('isExisting', true);
	},

	createNewList: function(){
		this.submitButton.click();
	},

	cancelCreatingNewList: function() {
		this.cancelButton.click();
	},

	editListDetails: function(NewListName){
		this.editListNameField.setValue(NewListName);
		this.sharedToggle.click();
		this.submitButton.click();
	},

	addDispositionListItem: function(ListName , DispCode){
		this.plusButton.click();
		this.dispositionName.isExisting();
		this.dispositionName.setValue(ListName);
		this.dispositionCode.setValue(DispCode);
		this.description.setValue("Disposition List Item Created Successfully");
		this.submitButtonListItem.waitAndClick();
		Brow.pause(2000);
	},

	verifyDispositionListItem: function(ListName , DispCode){
		this.dispositionListItemNameInput.validateElementsState('isExisting', true);
		this.dispositionListItemNameInput.setValue(ListName);
		this.dispositionListItemCodeInput.setValue(DispCode);
		Brow.pause(2000);
		this.dispositionReasonListItemName(this.listItemName).validateElementsState('isExisting', true);
		this.dispositionReasonListItemCode(this.randomNum).validateElementsState('isExisting', true);
		this.dispositionCreateDescription.validateElementsState('isExisting', true);
	},

	addReasonListItem: function(ListName , DispCode){
		this.plusButton.click();
		this.reasonName.setValue(ListName);
		this.reasonCode.setValue(DispCode);
		this.description.setValue("Reason List Item Created Successfully");
		this.submitButtonListItem.waitAndClick();
		Brow.pause(2000);
	},


	closeListPanel: function() {
		this.closeButton.click();
	},

	editDispositionListItem: function(){
		this.editListItemButton(this.listItemName).validateElementsState('isExisting', true);
		this.editListItemButton(this.listItemName).click();
		this.dispositionCode.setValue(this.newRandomNum);
		this.description.setValue("Disposition List Item Edited Successfully");
		this.submitButtonListItem.waitAndClick();
	},

	verifyDispositionListItemUpdate: function(ListName, DispCode, NewDispCode){
		this.dispositionListItemNameInput.validateElementsState('isExisting', true);
		this.dispositionListItemNameInput.setValue(ListName);
		this.dispositionListItemCodeInput.setValue(DispCode);
		this.editListItemButton(this.listItemName).validateElementsState('isExisting', false);
		this.dispositionListItemCodeInput.setValue(NewDispCode);
		Brow.pause(2000);
		this.editListItemButton(this.listItemName).validateElementsState('isExisting', true);
		this.dispositionReasonListItemName(this.listItemName).validateElementsState('isExisting', true);
		this.newDispositionReasonListItemCode(this.newRandomNum).validateElementsState('isExisting', true);
		this.dispositionUpdateDescription.validateElementsState('isExisting', true);
	},

	editReasonListItem: function(){
		this.editListItemButton.click();
		this.reasonCode.setValue("10");
		this.description.setValue("Reason List Item Edited Successfully");
		this.submitButtonListItem.waitAndClick();
	},

	removeListItem: function(ListName, DispCode){
		this.dispositionListItemNameInput.validateElementsState('isExisting', true);
		this.dispositionListItemNameInput.setValue(ListName);
		this.dispositionListItemCodeInput.setValue(DispCode);
		this.removeListItemButton(this.listItemName).click();
		Brow.pause(2000);
	},

	verifyListItemRemoval: function(ListName, DispCode){
		this.dispositionListItemNameInput.validateElementsState('isExisting', true);
		this.dispositionListItemNameInput.setValue(ListName);
		this.dispositionListItemCodeInput.setValue(DispCode);
		this.editListItemButton(this.listItemName).validateElementsState('isExisting', false);
		this.dispositionReasonListItemName(this.listItemName).validateElementsState('isExisting', false);
		this.newDispositionReasonListItemCode(this.newRandomNum).validateElementsState('isExisting', false);
		this.dispositionUpdateDescription.validateElementsState('isExisting', false);
	},

};

module.exports = ListsPage;