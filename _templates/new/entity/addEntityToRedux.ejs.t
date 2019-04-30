---
inject: true
to: src/redux/modules/entities/index.js
before: //hygen-inject-before
---
  ,
  <%= name %>: {
    ...defaultEntity,
    readPermission: ['VIEW_ALL_<%= NAME %>'],
    updatePermission: ['MANAGE_ALL_<%= NAME %>'],
    createPermission: ['MANAGE_ALL_<%= NAME %>'],
    disablePermission: ['MANAGE_ALL_<%= NAME %>'],
    assignPermission: ['MANAGE_ALL_<%= NAME %>_SUBENTITY']
  }