const LoginPage = require('../../pages/login'),
      uuid = require('uuid'),
      ListsPage = require('../../pages/lists');
const {Element, Brow} = require('cx-automation-utils/pageObject');

var ListName = uuid() + "List",
    newListName = "New"+ uuid(),
    ReasonListName = uuid() + "Reason List",
    NewReasonListName = "New Reason List" + uuid();
describe('Config-UI Login spec', ()=>{
  it('Login and just hang out for a while', () => {
      LoginPage.login('nmoaaness@serenova.com', 'Canada2016@NB');
  });
  it('navigate to Lists page', ()=>{
    ListsPage.NavigateToListPage();
  });

  it('create DS code list type and check ', ()=>{

    ListsPage.iframe.switchToFrame();
    ListsPage.CreateListTypeDispositionsCode(ListName);
    ListsPage.CreateNewList();
    Brow.pause(8000);
    ListsPage.closeListPanel();
   });
   it('check if a list  is exists if yes edit if no create new List with type  DS ', ()=>{

   ListsPage.NameSearchinput.setValue(ListName);
   if(new Element('span[title="'+ListName+'"]').isExisting()){

   }
});

it('adding list items to the Disposition list',() =>{
    new Element('span[title="'+ListName+'"]').click();
  ListsPage.AddDispositionListItem("First Item","1");
  ListsPage.AddDispositionListItem("Second Item","2");
  ListsPage.AddDispositionListItem("Third Item","3");

});

it('removing list items to the Disposition list',() =>{

  ListsPage.RemoveListItem();

});

it('updating list items to the Disposition list',() =>{
  ListsPage.EditDispositionListItem();
  Brow.pause(8000);
  ListsPage.closeListPanel();


});

it('create Reason code list type and check ', ()=>{
  ListsPage.CreateListTypeReasonCodes(ReasonListName);
  ListsPage.CreateNewList();
  Brow.pause(8000);
  ListsPage.closeListPanel();
 });

 it('Once created verify its values ', ()=>{
    ListsPage.NameSearchinput.setValue(ReasonListName);
    if(new Element('span[title="'+ReasonListName+'"]').isExisting()){
       new Element('span[title="'+ReasonListName+'"]').click();
    }
});

  it('adding list items to the Reason list',() =>{
    new Element('span[title="'+ReasonListName+'"]').click();
    ListsPage.AddReasonListItem("Reason First Item","11");
    ListsPage.AddReasonListItem("Reason Second Item","12");
    ListsPage.AddReasonListItem("Reason Third Item","13");

  });

  it('removing list items to the reason code list',() =>{

    ListsPage.RemoveListItem();

  });

  it('updating list items to the reason code list',() =>{
    ListsPage.EditReasonListItem();

  });


});
