---
inject: true
to: src/containers/CrudEndpointUi/Layout.js
before: //hygen-inject-before1
---
  {
    path: '/configuration/<%= name %>',
    component: () => DetailsPanel(<%= Name %>Form)
  },