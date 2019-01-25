const strings = require('serenova-js-utils/strings');
module.exports = {
  prompt: ({ inquirer, args }) =>
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Enter the entityNameInCamelCase (E.g. dataAccessReports): \n`
        }
      ])
      .then(answers => ({
        ...answers,
        Name: strings.capitalizeFirstLetter(answers.name),
        NAME: answers.name.toUpperCase(),
        kebabName: strings.camelCaseToKebabCase(answers.name),
        normalName: strings.camelCaseToRegularForm(answers.name).toLowerCase(),
        NormalName: strings.capitalizeFirstLetter(
          strings.camelCaseToRegularForm(answers.name)
        ),
        pluralCheck: answers.name.charAt(answers.name.length) === 's'
      }))
};
