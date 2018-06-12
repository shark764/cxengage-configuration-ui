---
inject: true
to: src/containers/EntityTable/config.js
before: //hygen-inject-before
---
    case '<%= name %>':
      return [nameColumn, descriptionColumn];