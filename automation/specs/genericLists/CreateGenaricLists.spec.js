const LoginPage = require('../../pages/login'),
      uuid = require('uuid'),
      ListsPage = require('../../pages/lists');
const {Element, Brow} = require('cx-automation-utils/pageObject');

var ListName = uuid() + "List",
    newListName = "New"+ uuid(),
    ReasonListName = uuid() + "Reason List",
    NewReasonListName = "New Reason List" + uuid();

describe('Generic Lists - Lists', ()=>{

  it('Login and just hang out for a while', () => {
    LoginPage.login('nmoaaness@serenova.com', 'Canada2016@NB');
  });

  it('navigate to Lists page', ()=>{
    ListsPage.navigateToListPage();
  });

  it('create DS code list type and check ', ()=>{
    ListsPage.createListTypeDispositionsCode(ListName);
    Brow.pause(8000);
    ListsPage.closeListPanel();
  });

  it('Once created verify its values ', ()=>{
    ListsPage.nameSearchInput.setValue(ListName);
    if(new Element('span[title="'+ListName+'"]').isExisting()){
      new Element('span[title="'+ListName+'"]').click();
    }
    if(ListsPage.dispositionNameLabel.isVisible() && ListsPage.dispositionCodeLabel.isVisible() && ListsPage.dispositionDescriptionLabel.isVisible() && ListsPage.dispositionActionLabel.isVisible()) {
      ListsPage.closeListPanel();
    }
    Brow.pause(8000);
  });

  it('edit the DS code list to a new name and turn off the shared toggle', ()=>{
    new Element('span[title="'+ListName+'"]').click();
    //isVisbile for elements on page
    ListsPage.editListDetails(newListName);
    Brow.pause(8000);
    ListsPage.closeListPanel();
  });

  it('Once created verify its values ', ()=>{
    ListsPage.nameSearchInput.setValue(ListName);
    Brow.pause(8000);
    if(! new Element('span[title="'+ListName+'"]').isExisting()){
      ListsPage.nameSearchInput.setValue(newListName);
      if(new Element('span[title="'+newListName+'"]').isExisting() && ListsPage.listtypeDS.isExisting()){
        new Element('span[title="'+newListName+'"]').click();
      }
   }
  });

  it('Disable the List', ()=>{
    ListsPage.disableListToggle.waitAndClick();
    ListsPage.confirmButton.waitAndClick();
  });

  it('create Reason code list type and check ', ()=>{
    ListsPage.createListTypeReasonCodes(ReasonListName);
    Brow.pause(8000);
    ListsPage.closeListPanel();
  });

  it('Once created verify its values ', ()=>{
    ListsPage.nameSearchInput.setValue(ReasonListName);
    if(new Element('span[title="'+ReasonListName+'"]').isExisting()){
       new Element('span[title="'+ReasonListName+'"]').click();
    }
    if(ListsPage.reasonNameLabel.isVisible() && ListsPage.reasonCodeLabel.isVisible() && ListsPage.dispositionDescriptionLabel.isVisible() && ListsPage.dispositionActionLabel.isVisible()) {
       ListsPage.closeListPanel();
    }
  });

  it('edit the Reason code list to a new name and turn off the shared toggle', ()=>{
    new Element('span[title="'+ReasonListName+'"]').click();
    //isVisbile for elements on page
    ListsPage.editListDetails(NewReasonListName);
    Brow.pause(8000);
    ListsPage.closeListPanel();
  });

  it('Once created verify its values ', ()=>{
    ListsPage.nameSearchInput.setValue(ReasonListName);
    if(! new Element('span[title="'+ReasonListName+'"]').isExisting()){
      ListsPage.nameSearchInput.setValue(NewReasonListName);
      if(new Element('span[title="'+NewReasonListName+'"]').isExisting() && ListsPage.listtypeReason.isExisting()){
        new Element('span[title="'+NewReasonListName+'"]').click();
      }
    }
  });

  it('Disable the List', ()=>{
    ListsPage.disableListToggle.waitAndClick();
    ListsPage.confirmButton.waitAndClick();
  });

});
