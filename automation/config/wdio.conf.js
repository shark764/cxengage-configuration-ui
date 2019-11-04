// use environment variables from Dockerfile while running tests in jenkins pipeline
if (!process.env.URI) {
  require('dotenv').config({ path: './automation/config/.env' });
}

const { config } = require('cx-automation-utils/src/wdio.conf.js');
const tenants = require('cx-automation-utils/src/tenant.conf.js');
global.process.ENV = new tenants(process.env.REGIONVAR.toLowerCase(), process.env.ENVIRONMENT.toLowerCase()).CONSTANTS;

config.suites = {
  all: ['./automation/specs/**/*.spec.js']
};

exports.config = config;
