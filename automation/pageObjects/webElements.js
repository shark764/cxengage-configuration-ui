const { Element } = require('cx-automation-utils/src/pageObject.js');
const generatedPageObjects = require('./locators.json');

const elements = {};

// Generates webElements:
for (let key in generatedPageObjects) {
  elements[key] = new Element(`[data-automation="${key}"]`);
}

// find an element
elements.$ = (searchTerm, elementType) => {
  if (searchTerm.charAt(0) === '.' || searchTerm.charAt(0) === '#') {
    return new Element(`${searchTerm}`);
  } else {
    return new Element(`${elementType}[title="${searchTerm}"]`);
  }
};

// Adds custom objects to the list of webElements to which data-automation labels cannot be added:
// toastr component:
elements['toastSuccessMessage'] = new Element('div[class="toast toast-success"] div[class="toast-message"]');
elements['toastErrorMessage'] = new Element('div[class="toast toast-error"] div[class="toast-message"]');
elements['toastCloseButton'] = new Element('button[class="toast-close-button"]');
elements['enableMessage'] = new Element(`.//div[contains(text(),'This will enable')]`);
//modal components
elements['modalNameInput'] = new Element('input[data-automation="nameInput"]', 1);
elements['modalDescriptionInput'] = new Element('textarea[data-automation="descriptionInput"]', 1);
elements['modalSubmitButton'] = new Element('button[data-automation="sdpanelSubmitButton"]', 1);
//message Templates
elements['richTextEditorInput'] = new Element('div[class="notranslate public-DraftEditor-content"]');

module.exports = elements;
