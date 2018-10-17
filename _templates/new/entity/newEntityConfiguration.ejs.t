---
inject: true
to: src/redux/modules/entities/metaData.js
before: //Hygen-insert-new-entity-configuration
---
// <%= NormalName %>
entities.<%= name %>.pageTitle = '<%= NormalName %>';
entities.<%= name %>.helpLink = '/Help/Content/<%= Name %>.htm';
entities.<%= name %>.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Type', active: true }
];