const LoginPage = require('../../behavior/login');
const ListsPage = require('../../behavior/lists');

describe('Generic Lists - List Items', ()=>{

    it('Login to Config UI', () => {
        LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!');
    });

    it('Navigate to Lists page', ()=>{
        ListsPage.navigateToListPage();
    });

    //Disposition List
    it('Check for Existing Disposition Codes List or Create a New One', ()=>{
        ListsPage.checkForExistingDispositionList("Disposition Automation List");
    });

    it('Create List Item for Disposition List', ()=>{
        ListsPage.addDispositionListItem(ListsPage.listItemName , ListsPage.randomNum);
    });
    
    it('Verify List Item for Disposition List', ()=>{
        ListsPage.verifyDispositionListItem(ListsPage.listItemName , ListsPage.randomNum);
    });

    it('Edit List Item for Disposition List', ()=>{
        ListsPage.editDispositionListItem();
    });

    it('Verify List Item Update for Disposition List', ()=>{
        ListsPage.verifyDispositionListItemUpdate(ListsPage.listItemName, ListsPage.randomNum, ListsPage.newRandomNum);
    });

    it('Remove List Item from Disposition List', ()=>{
        ListsPage.removeListItem(ListsPage.listItemName, ListsPage.newRandomNum);
    });

    it('Verify List Item Removal from Disposition List', ()=>{
        ListsPage.verifyListItemRemoval(ListsPage.listItemName, ListsPage.newRandomNum);
    });

    //Reason List


 });

