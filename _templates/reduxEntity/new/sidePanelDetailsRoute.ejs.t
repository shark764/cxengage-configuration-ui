---
inject: true
to: src/containers/CrudEndpointUi/Layout.js
before: //hygen-inject-before2
---
  {
    path: '/configuration/<%= name %>',
    component: () => NoScrollDetailsPanel(<%= Name %>PanelContainer)
  },