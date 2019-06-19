const { Brow } = require('cx-automation-utils/pageObject');
const NavigateBar = require('../../behavior/common');
const LoginPage = require('../../behavior/common');
const clickCreate = require('../../behavior/common');
const updateGroupLine = require('../../behavior/groups');
const clickAction = require('../../behavior/common');
const Elem = require('../../behavior/index');

describe('Config-UI Users Page', () => {
  it('Login into CxEngage include Tanent', () => {
    LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!');
  });

  // it('Click on the create button', () => {
  //   clickCreate.CreateNewLine('AnyValue','navigationLinkGroups');
  // });
  // it('Click on the create button', () => {
  //   Elem.createButton.waitAndClick(3000);
  //   Brow.pause(8000);
  // });

  //it('update a group line', () => {
  //updateGroupLine.UpdateGroupName('updated','noone');
  //updateGroupLine.UpdateGroupDescription('noone','12334');
  //});

  // it('Click on the create button', () => {
  //   clickCreate.CreateNewLine('AnyValue','navigationLinkGroups');
  // });

  it('Click on the create button', () => {
    Elem.createButton.waitAndClick(3000);
    Brow.pause(8000);
  });

  //it('update a group line', () => {
  //updateGroupLine.UpdateGroupName('updated','noone');
  //updateGroupLine.UpdateGroupDescription('noone','12334');
  //});
});
