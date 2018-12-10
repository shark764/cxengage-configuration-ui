const { config } = require('cx-automation-utils/wdioConf');

config.suites = {
    "inProgress": ["./automation/specs/inProgress/*.spec.js"],
    "all": ["./automation/specs/**/*.spec.js"],
    "allEmailTemplates": ["./automation/specs/emailTemplates/*.spec.js"],
    "allGenericLists": ["./automation/specs/genericLists/*.spec.js"],

    // individual specs here

    // Email Templates
    "emailTemplates": ["./automation/specs/emailTemplates/emailTemplates.spec.js"],

    // Generic Lists
    "createGenericLists": ["./automation/specs/genericLists/CreateGenaricLists.spec.js"],
    "csvBulk": ["./automation/specs/genericLists/CSVBulk.spec.js"],
    "genericListItems": ["./automation/specs/genericLists/GenericListItems.spec.js"]

}

exports.config = config;
