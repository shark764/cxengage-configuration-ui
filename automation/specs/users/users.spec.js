const LoginPage = require('../../pages/loginDirect');
const $ = require('../../pages/emailTemplates').$;
const { Brow } = require('cx-automation-utils/pageObject');

describe('Config-UI Users Page', () => {

  it('Login into CxEngage', () => {
    LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!','users');
  });

  it('Search and find user by email', () => {
    $('.Email-filter-input').waitAndClick(3000);
    $('.Email-filter-input').setValue('cxselenium+supervisor');
    Brow.pause(3000);
  });

});
