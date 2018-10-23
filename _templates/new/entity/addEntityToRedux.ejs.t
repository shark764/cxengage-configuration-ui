---
inject: true
to: src/redux/modules/entities/index.js
before: //hygen-inject-before
---
  ,
  <%= name %>: {
    ...defaultEntity,
    readPermission: [],
    updatePermission: [],
    createPermission: [],
    disablePermission: [],
    assignPermission: [],
  }