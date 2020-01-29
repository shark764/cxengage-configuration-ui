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

// Modal components
elements['modalSubmitButton'] = new Element('button[data-automation="sdpanelSubmitButton"]', 1);
elements['modalDescriptionInput'] = new Element('textarea[data-automation="descriptionInput"]', 1);
// Draft-JS Editor (Message Templates & Email Templates)
elements['emailTemplateSubjectInput'] = new Element('div[class="notranslate public-DraftEditor-content"]');
elements['emailTemplateBodyInput'] = new Element('div[class="notranslate public-DraftEditor-content"]', 1);
elements['richTextEditorInput'] = new Element('div[class="notranslate public-DraftEditor-content"]');
// Nested List Components:
elements['secondCategoryRemoveButton'] = new Element('button[data-automation="removeCategoryButton"]', 1);
elements['secondListItemRemoveButton'] = new Element('button[data-automation="removeListItemButton"]', 1);
// Chat-Widget color components:
elements['brandColorInput'] = new Element('input[data-automation="colorPickerTextInput"]', 0);
elements['conversationColorInput'] = new Element('input[data-automation="colorPickerTextInput"]', 1);
elements['actionColorInput'] = new Element('input[data-automation="colorPickerTextInput"]', 2);

module.exports = elements;
