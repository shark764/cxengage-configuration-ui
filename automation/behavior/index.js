const {Element} = require('cx-automation-utils/pageObject'); 
const generatedPageObjects = require('./pageObjects.json');
const elements = {};
 for (let key in generatedPageObjects) {
  elements[key] = new Element(`[data-automation="${key}"]`);
}
elements.createButton = new Element(`#sdpanel-create`);
// find an element
elements.$ = (searchTerm, elementType) => {
  if (searchTerm.charAt(0) === '.' ||  searchTerm.charAt(0) === '#') {
     return new Element(`${searchTerm}`);
  } else {
     return new Element(`${elementType}[title="${searchTerm}"]`);
  }
};
 module.exports = elements;