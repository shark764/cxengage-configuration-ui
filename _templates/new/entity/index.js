const strings = require('serenova-js-utils/strings');
module.exports = {
  prompt: ({ inquirer, args }) =>
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Enter the entityNameInCamelCase: \n`,
        }
    ]).then(answers => ({
      ...answers,
      Name: strings.capitalizeFirstLetter(answers.name),
      normalName: strings.camelCaseToRegularForm(answers.name).toLowerCase(),
      pluralCheck: answers.name.charAt(answers.name.length) === 's',
    }))
}
