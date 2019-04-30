const LoginPage = require('../../behavior/login'),
      uuid = require('uuid'),
      ListsPage = require('../../behavior/lists');
const {Element, Brow} = require('cx-automation-utils/pageObject');
var ListName = uuid() + "List",
    path = require('path'),
    listfilename = path.resolve(__dirname, '../../../../../Downloads/'+ListName+'.csv');
describe('Config-UI Login spec', ()=>{
  it('Login and just hang out for a while', () => {
      LoginPage.login('nmoaaness@serenova.com', 'Canada2016@NB');
  });
  it('navigate to Lists page', ()=>{
    ListsPage.NavigateToListPage();
  });

 it('create new list ', ()=>{

   ListsPage.iframe.switchToFrame();
   ListsPage.CreateListTypeDispositionsCode(ListName);
   ListsPage.CreateNewList();
   Brow.pause(8000);
   ListsPage.closeListPanel();
  });



it('start download list as CSV file',() =>{
   //ListsPage.iframe.switchToFrame();
   ListsPage.NameSearchinput.setValue(ListName);
   if(new Element('span[title="'+ListName+'"]').isExisting()){
      new Element('span[title="'+ListName+'"]').click();
   }
   ListsPage.startdownloadbutton.waitAndClick();
    Brow.pause(8000);
   ListsPage.choosefilebutton.waitAndClick();
   ListsPage.uploadlistfile(listfilename);
   ListsPage.ConfirmButton.waitAndClick();
   Brow.pause(8000);

});

it('start download list as CSV file',() =>{
   ListsPage.choosefilebutton.waitAndClick();
   ListsPage.uploadlistfile(listfilename);
   ListsPage.ConfirmButton.waitAndClick();
   Brow.pause(8000);

});




});
