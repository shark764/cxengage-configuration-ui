/**
 * Page Objects for logging into config 2 directly
 */
const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('..');
const dictionary = require('../../dictionary/index.json');
const tableRow = new Element('div[tableRowSelect="0"]');
const uuid = require('uuid');

const commonBehavior = {
	login: function (username, password) {
    Brow.url(`${process.env.URL}`);
		Elem.username.waitForVisible(60000);
		Elem.username.setValue(username);
		Elem.password.waitForVisible(40000);
		Elem.password.setValue(password);
		Elem.signInButton.waitAndClick();
		Elem.chooseTenantButton.waitForVisible(60000);
		Elem.chooseTenantButton.waitAndClick();
    Brow.pause(2000);
  },
        
  navigationMainBar: function (firstChoice, secondChoice) {
    let navBar = new Element(`[data-automation="${firstChoice}"]`);
    let navBarSub = new Element(`[data-automation="${secondChoice}"]`);
    navBar.waitAndClick();
    navBarSub.waitAndClick();
    Brow.pause(2000);
  },

  /**
 * insertDataTextValues
 * @param {String} entity - The tested page name
 * @return - Set the text value 
 */
  insertDataTextValues: function(entity,action,type) {
    dictionary[entity].specs[action].parametersToInsert.forEach(parameters => {
      const param = Object.keys(parameters)[0];
      if(param.includes(type)) {
        parameters.textInputs.forEach(insertedInput => {
          if(insertedInput.includes("email")) return Elem[insertedInput].setValue(uuid()+"@test.com");
          else return Elem[insertedInput].setValue(uuid()+"test");
        });
      }
    });
  },

  insertAutoCompleteValues: function(entity,action,type) {
    dictionary[entity].specs[action].parametersToInsert.forEach(parameters => {
      const param = Object.keys(parameters)[0];
      if(param.includes(type)) {
        parameters.autoCompleteInputs.forEach(insertedInput => {
          Object.keys(insertedInput).forEach (autoCompleteLine => {
            Elem[autoCompleteLine].setValue(insertedInput[autoCompleteLine]);
            let parameterAutoCompleteValue = new Element(`.//li[text()="${insertedInput[autoCompleteLine]}"]`);
            parameterAutoCompleteValue.waitAndClick();
      });  
        });
      }
    });
  },

  insertExtraValues: function(entity,action,type) {
    dictionary[entity].specs[action].parametersToInsert.forEach(parameters => {
      const param = Object.keys(parameters)[0];
      if(param.includes(type)) {
        parameters.extraInputs.forEach(insertedInput => {
          Object.keys(insertedInput).forEach (extraLine => {
            Elem[extraLine].setValue(insertedInput[extraLine]);

      });  
        });
      }
    });
  },


  insertListValues: function (entity,action,type){
    dictionary[entity].specs[action].parametersToInsert.forEach(parameters => {
      const param = Object.keys(parameters)[0];
      if(param.includes(type)) {
        parameters.listInputs.forEach(insertedInput => {
          Object.keys(insertedInput).forEach (listLine => {
          Elem[listLine].waitAndClick();
          let parameterListValue = new Element(`.//option[text()="${insertedInput[listLine]}"]`);
          parameterListValue.waitAndClick();
          });
        });
      }
    });
  },

  insertRadioValues: function (entity,action,type){
    dictionary[entity].specs[action].parametersToInsert.forEach(parameters => {
      const param = Object.keys(parameters)[0];
      if(param.includes(type)) {
        parameters.radioGroupInputs.forEach(insertedInput => {
          Object.keys(insertedInput).forEach (radioGroupLine => {
            let parameterRadioGroupValue =  new Element(`input[value="${insertedInput[radioGroupLine]}"]`);
            parameterRadioGroupValue.waitAndClick();
          });  
        });
      }
    });
  },

  updateValues: function(valueToSearchForUpdate,entity){
      this.searchByNameAndClick(entity,valueToSearchForUpdate);
      Brow.pause(3000);
      this.insertDataTextValues(entity,"update","text");
      this.insertListValues(entity,"update","list");
      this.insertRadioValues(entity,"update","radio");
      this.insertAutoCompleteValues(entity,"update","auto");
      if (Elem.submitButton.isExisting()){
        Elem.submitButton.waitAndClick();
        Brow.pause(3000);
        return (this.verifyAction());
      }
    
    return false
  },

  createNewEntity: function (entity){
    if (Elem.entityCreateButton.isExisting()){
      Elem.entityCreateButton.waitAndClick();
      this.insertDataTextValues(entity,"create","text");
      this.insertListValues(entity,"create","list");
      this.insertRadioValues(entity,"create","radio");
      this.insertAutoCompleteValues(entity,"create","auto");
      this.insertExtraValues(entity,"create","extra");
      if (Elem.submitButton.isExisting()){
        Elem.submitButton.waitAndClick();
        Brow.pause(3000);
        return (this.verifyAction());
      }
    }
    return false
  },

  verifyAction:function (){
    Brow.pause(1000);
    var verification = new Element('div[aria-live="assertive"]');
    return !(verification.isExisting())
  },


  searchByNameAndClick: function (entity,valueToSearchForUpdate){
    Brow.pause(1000);
    var columnElement = new Element(`[data-automation="${dictionary[entity].whichCatagoryToSearch}"]`);
    columnElement.setValue(valueToSearchForUpdate);
    tableRow.waitAndClick();
  },

  statusToggle: function(name) {
    this.searchByNameAndClick(name);
    Elem.statusToggle.waitAndClick();
    let confirmButton = new Element('button[id="confirm"]');
    confirmButton.waitAndClick();
    Brow.pause(2000);
  }
};

module.exports = commonBehavior;
