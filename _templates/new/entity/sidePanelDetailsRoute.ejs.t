---
inject: true
to: src/containers/CrudEndpointUi/layout.js
before: //hygen-inject-before2
---
  ,
  {
    path: '/configuration/<%= name %>',
    component: () => (
      <NoScrollDetailsPanel>
        <<%= className %>DetailsPanel>
          <<%= className %>Form />
        </<%= className %>DetailsPanel>
      </NoScrollDetailsPanel>
    )
  },