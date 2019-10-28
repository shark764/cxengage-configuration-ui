const { config } = require('cx-automation-utils/wdioConf');

if (process.env.URI) {
    console.log('URI is set , running test against selenium hub');
    process.env.URL = process.env.URI;
    process.env.HOST = 'resources-selenium.cxengagelabs.net';
    config.host = 'resources-selenium.cxengagelabs.net';
    config.maxInstances = 10;
    process.env.REGIONVAR = '';
    process.env.ENVIRONMENT = '';
    process.env.TENANT = '';
    process.env.TEST_BROWSER = 'chrome';
    // process.env.HEADLESS = true;
} else if (!process.env.URL) {
    console.log('URL not provided , running test against localhost');
    process.env.LOCALONLY = true;
    process.env.URL = 'https://dev-config2.cxengagelabs.net/#/'
    config.maxInstances = 1;
    process.env.REGIONVAR = '';
    process.env.ENVIRONMENT = '';
    process.env.USERNAME = 'areddy@serenova.com';
    process.env.PASSWORD = 'selenium1!';
    process.env.TENANT = 'Anil-1';
}

config.suites = {
    all: ['./automation/specs/**/*.spec.js'],
};

exports.config = config;