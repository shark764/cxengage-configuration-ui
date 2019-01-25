const LoginPage = require('../../pages/loginDirect');
const $ = require('../../pages/emailTemplates').$;
const { Brow } = require('cx-automation-utils/pageObject');

describe('Config-UI Users Page', () => {

  it('Login into CxEngage', () => {
    LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!','users');
  });

  it('Search and find user by email, update users external id', () => {
    $('.Email-filter-input').waitAndClick(3000);
    $('.Email-filter-input').setValue('cxselenium+supervisor');
    $('cxselenium+supervisor@gmail.com', 'span').waitAndClick(3000);
    $('.frm-users-external-id').waitAndClick(3000);
    $('.frm-users-external-id').setValue('abc123');
    $('#sdpanel-submit').waitAndClick(3000);;
    $('abc123', 'span').waitAndClick(3000);
    // Change it to something different so next test will pass
    Brow.pause(300); // Pause is required as form gets reinitialized halfway throught typing the next value
    $('.frm-users-external-id').setValue('def456');
    $('#sdpanel-submit').waitAndClick(3000);;
    $('def456', 'span').waitAndClick(3000);
  });

});
