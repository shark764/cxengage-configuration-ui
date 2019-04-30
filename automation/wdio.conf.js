const { config } = require('cx-automation-utils/wdioConf');

if(!process.env.URL) {
  process.env.LOCALONLY = true;
  process.env.URL = 'http://localhost:3000/#/';
  config.maxInstances = 1;
  process.env.REGIONVAR = "";
  process.env.ENVIRONMENT = "";
  process.env.TENANT = "";

}

else {
  config.host = 'resources-selenium.cxengagelabs.net';
  config.maxInstances = 10;
  process.env.REGIONVAR = "";
  process.env.ENVIRONMENT = "";
  process.env.TENANT = "";
  process.env.HEADLESS = true;

  
}


config.suites = {
    "inProgress": ["./automation/specs/inProgress/*.spec.js"],
    "all": ["./automation/specs/**/*.spec.js"],
    "allEmailTemplates": ["./automation/specs/emailTemplates/*.spec.js"],
    "allGenericLists": ["./automation/specs/genericLists/*.spec.js"],
    "preMerge": ["./automation/specs/users/*.spec.js"],
    "allSLA": ["./automation/specs/SLA/*.spec.js"],

    // individual specs here

    // Configurable SLA
    "configurableSLA": ["./automation/specs/SLA/configurableSLA.spec.js"],

    // Users
    "users": ["./automation/specs/users/*.spec.js"],

    // Email Templates
    "emailTemplates": ["./automation/specs/emailTemplates/emailTemplates.spec.js"],

    // Generic Lists
    "createGenericLists": ["./automation/specs/genericLists/CreateGenaricLists.spec.js"],
    "csvBulk": ["./automation/specs/genericLists/CSVBulk.spec.js"],
    "genericListItems": ["./automation/specs/genericLists/GenericListItems.spec.js"]

}

exports.config = config;
