const LoginPage = require('../../pages/loginDirect');
const UsersPage = require('../../pages/emailTemplates');
const { Element, Brow } = require('cx-automation-utils/pageObject');

describe('Config-UI Email Templates spec', () => {

  it('Login into CxEngage', () => {
      LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!','users');
  });

  it('Validate all Email Templates Appear on Screen', () => {
    UsersPage.nameSearchInput.waitAndClick(3000);
    UsersPage.nameSearchInput.setValue('nicholas.guimond+7@gmail.com');
    Brow.pause(8000);
  });

});
