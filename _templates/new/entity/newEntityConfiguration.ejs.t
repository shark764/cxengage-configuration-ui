---
inject: true
to: src/redux/modules/entities/metaData.js
before: //Hygen-insert-new-entity-configuration
---
// <%= NormalName %>
entities.<%= name %>.pageTitle = '<%= NormalName %> Management';
entities.<%= name %>.helpLink = '/Help/Content/Managing%20<%= className %>/Creating_<%= className %>.htm';
entities.<%= name %>.dependentEntity = 'dependentEntity';
entities.<%= name %>.columns = [
  { name: 'Name', active: true },
  { name: 'Description', active: true },
  { name: 'Type', active: true }
];
entities.<%= name %>.defaultFilters = [
  { id: 'active', value: 'enabled' },
  { id: 'type', value: 'defaultType' }
];