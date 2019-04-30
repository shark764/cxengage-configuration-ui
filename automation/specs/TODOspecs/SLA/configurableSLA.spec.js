const { Brow } = require('cx-automation-utils/pageObject'),
        LoginPage = require('../../behavior/login'),
        SLAPage = require('../../behavior/ConfigurableSLA');

describe('Config-UI Configurable SLA spec', ()=>{

  it('Login to Config ui', () => {
      LoginPage.login('cxselenium+admin@gmail.com', 'selenium1!');
  });

  it('Navigate to the SLA page', ()=>{
    SLAPage.navigateToSLAPage();  
  });

  it('Validate Main Pane Elements', ()=>{
    SLAPage.iframe.switchToFrame();
    Brow.pause(3000);
    SLAPage.validateMainPaneElements();
  });

  it('Edit SLA Name and Description', ()=>{
    SLAPage.editSLA();
  });

  it('Validate SLA Entity in Main Pane', ()=>{
    SLAPage.validateSLAEdit();
  });

  it('Edit SLA Abandon type to Ignore Abandons Type.', ()=>{
    SLAPage.editToIgnoreAbandonsType();
  });

  it('Validate SLA Abandon Type change to Ignore Abandons update.', ()=>{
    SLAPage.validateIgnoreAbandonsType();
  });

  it('Edit SLA Abandon type to Count Against SLA.', ()=>{
    SLAPage.editSLAAbandonType();
  });

  it('Validate SLA Abandon type change to Count Against SLA.', ()=>{
    SLAPage.validateSLAAbandonType();
  });

  it('Update SLA Toggle.', ()=>{
    SLAPage.toggleSLA();
  });

  it('Update SLA Toggle to be original Value again.', ()=>{
    SLAPage.toggleSLA();
  });

});
