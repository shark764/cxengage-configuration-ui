const { config } = require('cx-automation-utils/wdioConf');

config.suites = {
    "inProgress": ["./automation/specs/inProgress/*.spec.js"],
    "all":["./automation/specs/**/*.spec.js"]
}

exports.config = config;
