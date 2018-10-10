const LoginPage = require('../../pages/login'),
      ListsPage = require('../../pages/lists');
const {Element, Brow} = require('cx-automation-utils/pageObject');
//const	Brow = require('../../../resources/classes/protractorObjects');
describe('Config-UI Login spec', ()=>{
  it('Login and just hang out for a while', () => {
      LoginPage.login('nmoaaness@serenova.com', 'Canada2016@NB');
  });
  it('navigate to Lists page', ()=>{
    ListsPage.NavigateToListPage();
    Brow.pause(8000);
  });

 it('check if a list  is exists if yes edit if no create new List with type Dispostion Code', ()=>{
   ListsPage.iframe.switchToFrame();
   ListsPage.NameSearchinput.setValue("auto list Disposition type");
   if (ListsPage.DispositionsMainList.isExisting()) {
    ListsPage.DispositionsMainList.click();
    ListsPage.EditListDetails("new name for Dispostion list ");
    Brow.pause(80000);
   }
   else {

    ListsPage.CreateListTypeDispositionsCode("auto list Disposition type");
    ListsPage.CreateNewList();
    Brow.pause(8000);
   }

  ListsPage.closeListPanel();

  });

it('adding list items to the Disposition list',() =>{
  //ListsPage.iframe.switchToFrame();
  ListsPage.DispositionsMainList.click();
  ListsPage.AddDispositionListItem("First Item","1");
  ListsPage.AddDispositionListItem("Second Item","2");
  ListsPage.AddDispositionListItem("Third Item","3");
  ListsPage.RemoveListItem();
  ListsPage.EditDispositionListItem();

});

  it('check if a list  is exists if yes edit if no create new List with type Reason Code', ()=>{
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
  });

  it('adding list items to the Reason list',() =>{
    //ListsPage.iframe.switchToFrame();
    ListsPage.ReasonsMainList.click();
    ListsPage.AddReasonListItem("Reason First Item","11");
    ListsPage.AddReasonListItem("Reason Second Item","12");
    ListsPage.AddReasonListItem("Reason Third Item","13");
    ListsPage.RemoveListItem();
    ListsPage.EditReasonListItem();

  });



});
