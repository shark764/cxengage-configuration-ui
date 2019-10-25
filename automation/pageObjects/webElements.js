const { Element } = require('cx-automation-utils/pageObject');
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
// mainEntity table component:
elements['inActiveTableRow'] = new Element('div[class="rt-tr row-selected-not-active -odd"]');
elements['activeTableRow'] = new Element('div[class="rt-tr row-selected-active -odd"]');

module.exports = elements;
