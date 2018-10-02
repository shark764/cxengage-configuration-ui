const LoginPage = require('../../pages/loginPage');

exports.loginSpec = describe('loginSpec', () => {
    it('Login and just hang out for a while', () => {
        LoginPage.login('username@serenova.com', 'password');
	});
});

