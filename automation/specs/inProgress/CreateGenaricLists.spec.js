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

  it('Once created verify its values ', ()=>{
   ListsPage.NameSearchinput.setValue(ListName);
   if(new Element('span[title="'+ListName+'"]').isExisting()){
      new Element('span[title="'+ListName+'"]').click();
   }

   if(ListsPage.DispositionNameLable.isVisible()
   && ListsPage.DispositionCodeLable.isVisible()
   && ListsPage.DispositionDescriptionLable.isVisible()
   && ListsPage.DispositionActionLable.isVisible()) {
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
   ListsPage.DisablListToggle.waitAndClick();
   ListsPage.ConfirmButton.waitAndClick();

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

    if(ListsPage.ReasonNameLable.isVisible() && ListsPage.ReasonCodeLable.isVisible() && ListsPage.DispositionDescriptionLable.isVisible() && ListsPage.DispositionActionLable.isVisible()) {
       ListsPage.closeListPanel();
    }
     });


   it('edit the Reason code list to a new name and turn off the shared toggle', ()=>{
       new Element('span[title="'+ReasonListName+'"]').click();
       //isVisbile for elements on page
       ListsPage.EditListDetails(NewReasonListName);
       Brow.pause(8000);
       ListsPage.closeListPanel();
      });


    it('Once created verify its values ', ()=>{
       ListsPage.NameSearchinput.setValue(ReasonListName);
       if(! new Element('span[title="'+ReasonListName+'"]').isExisting()){
           ListsPage.NameSearchinput.setValue(NewReasonListName);
           if(new Element('span[title="'+NewReasonListName+'"]').isExisting() && ListsPage.ListtypeReason.isExisting()){
              new Element('span[title="'+NewReasonListName+'"]').click();
           }
       }

        });
    it('Disable the List', ()=>{
         ListsPage.DisablListToggle.waitAndClick();
         ListsPage.ConfirmButton.waitAndClick();

     });


});
