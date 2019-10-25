const commonBehavior = require('../dictionary/common');
const dictionary = require('../dictionary/index');

describe('LOG', ()=> {
  it('test -1', ()=> {
    console.log('************* FIXING AUTOMATION TESTS AS OF NOW')
  });
});

// describe(`Config UI`, () => {
//   it('Login', () => {
//     commonBehavior.login();
//   });
//   it('Select Tenant', () => {
//     commonBehavior.chooseTenant();
//   });
// });

// Object.keys(dictionary).forEach(entity => {
//   describe(`Config UI`, () => {
//     it(`Navigate to ${entity}`, () => {
//       commonBehavior.navigationMainBar(entity);
//     });
//     it(`Create ${entity}`, () => {
//       commonBehavior.entityCRUD(entity, 'create');
//     });
//     it(`Update ${entity}`, () => {
//       commonBehavior.entityCRUD(entity, 'update');
//     });
//     if (dictionary[entity].specs['delete']) {
//       it(`Delete ${entity}`, () => {
//         commonBehavior.entityCRUD(entity, 'delete');
//       });
//     }
//   });
// });

// describe('Config UI', () => {
//   it('Logout', () => {
//     commonBehavior.logout();
//   });
// });
