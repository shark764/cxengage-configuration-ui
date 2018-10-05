const {Element, Brow} = require('cx-automation-utils/pageObject'),
	Common = require('../common/index.js'),
	urls = require('../uiUrls/uiUrls.js'),
	MainPage = require('../main/index.js');

const ListsPage = {
	iframe: new Element('iframe[src="https://dev-config2.cxengagelabs.net/#/configuration/lists"]'),
// search inputs
  NameSearchinput: new Element('input[class="entity-table-filter-column-name"]'),
	linkToListsDocs: new Element('a[href="https://docs.cxengage.net/Help/Content/Configuring%20CxEngage/Lists/Lists.htm"]'),
	configurationDropDown: new Element('dropdown[id="configurationDropConfig"]'),
	listsLink: new Element('li[id="lists-configuration-link"]'),
	//create list panel
	selectListTypeDrpDown: new Element('select[name="listTypeId"]'),
	createButton:  new Element('button[id="sdpanel-create"]'),
	newListNameInpt: new Element('input[name="name"]'),
	ListTypeDispositionsCode: new Element('option[value="57083780-332d-11e6-8dd4-c88eee4d9f61"]'),
	ListTypeReasonCodes: new Element('option[value="57083781-332d-11e6-8dd4-c88eee4d9f61"]'),
  CancelButton:  new Element('button[id="sdpanel-cancel"]'),
  SubmitButton:  new Element('button[id="sdpanel-submit"]'),
	closeButton:  new Element('div[id="sdpanel-close-panel"]'),
	// Edit list panel
	EditListNameField:  new Element('input[id="frm-lists-name"]'),
	SharedToggle: new Element('label[id="frm-lists-shared"]'),
	Description : new Element('input[id="frm-list-item-description"]'),
	PlusButton : new Element('button[id="sdpanel-add-item"]'),
	SubmitButtonListItem:  new Element('button[id="sdpanel-submit"]',1),

	// Disposition list item values
	DispositionName : new Element('input[id="frm-list-item-dispositionName"]'),
	DispositionCode : new Element('input[id="frm-list-item-dispositionCode"]'),
	EditListItemButton: new Element('button[class="dtpanel-action-update-item sc-hqyNC eeFTzR sc-bdVaJa dGShxa"]'),
	RemoveListItemButton: new Element('button[class="dtpanel-action-remove-item sc-hqyNC eeFTzR sc-bdVaJa dGShxa"]'),

// Reason list item values
  RasonName : new Element('input[id="frm-list-item-reasonName"]'),
  ResonCode : new Element('input[id="frm-list-item-reasonCode"]'),

  DisablListToggle : new Element('label[id="sdpanel-toggle-status"]'),
  ConfirmButton : new Element('button[id="confirm"]'),
	DispositionNameLable : new Element('span[title="Disposition Name"]'),
  DispositionCodeLable : new Element('span[title="Disposition Code"]'),
	DispositionDescriptionLable : new Element('span[title="Description"]'),
	DispositionActionLable : new Element('div[class="rt-resizable-header-content"]'),
	ListtypeDS : new Element('span[title="Disposition Codes Type"]'),
	ListEnabled : new Element('div[class="rt-td"]Enabled'),
  ListDisabled : new Element('div[class="rt-td"]Disabled'),


  NavigateToListPage: function(){
		this.configurationDropDown.waitAndClick();
    this.configurationDropDown.waitAndClick();
    this.listsLink.waitAndClick();
	},

	CreateListTypeDispositionsCode: function(ListName){
		this.createButton.waitAndClick();
		this.newListNameInpt.setValue(ListName);
    this.selectListTypeDrpDown.click();
		this.ListTypeDispositionsCode.click();
		//look into second click
		this.ListTypeDispositionsCode.click();
    Brow.pause(8000);
	},

CreateListTypeReasonCodes: function(ListName){
		this.createButton.waitAndClick();
		this.newListNameInpt.setValue(ListName);
    this.selectListTypeDrpDown.click();
		this.ListTypeReasonCodes.click();
		this.ListTypeReasonCodes.click();
    Brow.pause(8000);
	},

CreateNewList: function(){
	this.SubmitButton.click();
	},

CanacelCreatingNewList: function() {
this.CancelButton.click();
},

EditListDetails: function(NewListName){
this.EditListNameField.setValue(NewListName);
this.SharedToggle.click();
this.SubmitButton.click();
},

AddDispositionListItem: function( NewListName , Newcode){
	this.PlusButton.click();
	this.DispositionName.setValue(NewListName);
	this.DispositionCode.setValue(Newcode);
	this.Description.setValue("this list item has been crated by auto test and this is Nourhan ");
	this.SubmitButtonListItem.waitAndClick();
	Brow.pause(2000);
},

AddReasonListItem: function( NewListName , Newcode){
	this.PlusButton.click();
	this.RasonName.setValue(NewListName);
	this.ResonCode.setValue(Newcode);
	this.Description.setValue("this list item has been crated by auto test and this is Nourhan ");
	this.SubmitButtonListItem.waitAndClick();
	Brow.pause(8000);
},


closeListPanel: function() {
this.closeButton.click();

},

EditDispositionListItem: function(){
this.EditListItemButton.click();
this.DispositionCode.setValue("10");
this.Description.setValue("this is Nourhan edidting the description for that list item");
this.SubmitButtonListItem.waitAndClick();
},

EditReasonListItem: function(){
this.EditListItemButton.click();
this.ResonCode.setValue("10");
this.Description.setValue("this is Nourhan edidting the description for that list item");
this.SubmitButtonListItem.waitAndClick();
},

RemoveListItem: function(){
this.RemoveListItemButton.click();
Brow.pause(8000);
}

};

module.exports = ListsPage;
