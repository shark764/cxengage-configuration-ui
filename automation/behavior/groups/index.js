const { Element, Brow } = require('cx-automation-utils/pageObject');
const Elem = require('..');
const searchAndClick = require('../common/index.js');

const tableRow = new Element('div[tablerowselect="0"]')
const groupsName = new Element('input[id="frm-groups-name"]')
const groupsDescription = new Element('textarea[name="description"]')

const Groups = {
    UpdateGroupName: function (oldName,newName){
        searchAndClick.SearchByNameAndClick(oldName);
        groupsName.setValue(newName);
        Brow.pause(6000);
        Elem.submitButton.waitAndClick();
    },
    UpdateGroupDescription: function (name,description){
        searchAndClick.SearchByNameAndClick(name);
        groupsDescription.setValue(description);
        Elem.submitButton.waitAndClick();
    }
}

module.exports = Groups;
