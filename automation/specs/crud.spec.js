const commonBehavior = require('../dictionary/common');
const dictionary = require('../dictionary/index');

const keydInTests = process.env.TESTS_TO_RUN;
const totalTests = Object.keys(dictionary);
let testsToRun = [];

// Filters out the tests to run based on the input provided to TESTS_TO_RUN in './automation/config/.env' file
if (keydInTests && keydInTests !== 'all') {
  testsToRun = keydInTests.split(',').map(x => x.trim()).filter(a => totalTests.find(b => a === b) !== undefined)
} else {
  testsToRun = totalTests;
}

describe(`Config UI`, () => {
  it('Login', () => {
    commonBehavior.login();
  });
  it('Select Tenant', () => {
    commonBehavior.chooseTenant();
  });
});

testsToRun.forEach(entity => {
  describe(`Config UI`, () => {
    it(`Navigate to ${entity}`, () => {
      commonBehavior.navigationMainBar(entity);
    });
    if (dictionary[entity].specs['deleteBeforeAPI']) {
      it(`Delete an entity for ${entity} before test has started`, () => {
        commonBehavior.entityCRUD(entity, 'deleteBeforeAPI');
      });
    }
    if (dictionary[entity].specs['createAPI']) {
      it(`Create a required entity for ${entity} creation`, () => {
        commonBehavior.entityCRUD(entity, 'createAPI');
      });
    }
    if (dictionary[entity].specs['create']) {
      it(`Create ${entity}`, () => {
        commonBehavior.entityCRUD(entity, 'create');
      });
    }
    if (dictionary[entity].specs['update']) {
      it(`Update ${entity}`, () => {
        commonBehavior.entityCRUD(entity, 'update');
      });
    }
    if (dictionary[entity].specs['delete']) {
      it(`Delete ${entity}`, () => {
        commonBehavior.entityCRUD(entity, 'delete');
      });
    }
    if (dictionary[entity].specs['deleteAfterAPI']) {
      it(`Delete an entity for ${entity} after test has completed`, () => {
        commonBehavior.entityCRUD(entity, 'deleteAfterAPI');
      });
    }
  });
});

describe('Config UI', () => {
  it('Logout', () => {
    commonBehavior.logout();
  });
});
