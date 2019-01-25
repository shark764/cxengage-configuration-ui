---
inject: true
to: src/containers/CrudEndpointUi/layout.js
before: //hygen-inject-before1
---
  ,
  {
    path: '/configuration/<%= name %>',
    component: () => (
      <DetailsPanel>
        <<%= className %>Form />
      </DetailsPanel>
    )
  },