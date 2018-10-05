const LoginPage = require('../../pages/login'),
      uuid = require('uuid'),
      ListsPage = require('../../pages/lists');
const {Element, Brow} = require('cx-automation-utils/pageObject');

var ListName = uuid() + "List",
    newListName = "New"+ uuid();
describe('Config-UI Login spec', ()=>{
  it('Login and just hang out for a while', () => {
      LoginPage.login('nmoaaness@serenova.com', 'Canada2016@NB');
  });
  it('navigate to Lists page', ()=>{
    ListsPage.NavigateToListPage();
    Brow.pause(8000);
  });

 it('create DS code list type and check ', ()=>{

   ListsPage.iframe.switchToFrame();

   ListsPage.CreateListTypeDispositionsCode(ListName);
   ListsPage.CreateNewList();
   Brow.pause(8000);
   ListsPage.closeListPanel();


  });

  it('Once created verify its values ', ()=>{
   ListsPage.NameSearchinput.setValue(ListName);
   Brow.pause(8000);
   if(new Element('span[title="'+ListName+'"]').isExisting()){
      new Element('span[title="'+ListName+'"]').click();
   }

   if(ListsPage.DispositionNameLable.isVisible() && ListsPage.DispositionCodeLable.isVisible() && ListsPage.DispositionDescriptionLable.isVisible() && ListsPage.DispositionActionLable.isVisible()) {
      ListsPage.closeListPanel();
   }
     Brow.pause(8000);
    });

 it('edit the DS code list to a new name and turn off the shared toggle', ()=>{

   new Element('span[title="'+ListName+'"]').click();
   //isVisbile for elements on page
   ListsPage.EditListDetails(newListName);
   Brow.pause(8000);
   ListsPage.closeListPanel();

  });

  it('Once created verify its values ', ()=>{
   ListsPage.NameSearchinput.setValue(ListName);
   Brow.pause(8000);
   if(! new Element('span[title="'+ListName+'"]').isExisting()){
       ListsPage.NameSearchinput.setValue(newListName);
       if(new Element('span[title="'+newListName+'"]').isExisting() && ListsPage.ListtypeDS.isExisting()){
          new Element('span[title="'+newListName+'"]').click();
       }
   }

    });

  it('Disable the List', ()=>{
   Brow.pause(8000);
   ListsPage.DisablListToggle.waitAndClick();
   ListsPage.ConfirmButton.waitAndClick();
   Brow.pause(8000);

  if(! ListsPage.DisablListToggle.isEnabled())
  {
console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    ListsPage.closeListPanel();
  }

 Brow.pause(8000);
   });



/*  it('check if a list  is exists if yes edit if no create new List with type Reason Code', ()=>{
  //  ListsPage.iframe.switchToFrame();
    ListsPage.NameSearchinput.setValue("auto list Reason type");
    if (ListsPage.ReasonsMainList.isExisting()) {
     ListsPage.ReasonsMainList.click();
     ListsPage.EditListDetails("new name for Reasons list ");
     Brow.pause(8000);
    }
    else {
     ListsPage.CreateListTypeReasonCodes("auto list Reason type");
     ListsPage.CreateNewList();
     Brow.pause(8000);
    }
ListsPage.closeListPanel();
ListsPage.NameSearchinput.setValue("new name for Reasons list");
Brow.pause(8000);
}); */





});
