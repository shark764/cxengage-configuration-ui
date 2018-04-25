export const capitalizeFirstLetter = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const removeLastLetter = string =>
  string.substring(0, string.length - 1);

export const camelCaseToKebabCase = string =>
  string.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

export const camelCaseToRegularForm = string =>
  string
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str) {
      return str.toUpperCase();
    });

export const camelCaseToRegularFormAndRemoveLastLetter = string =>
  camelCaseToRegularForm(removeLastLetter(string));

export const capitalizeFirstAndRemoveLastLetter = string =>
  capitalizeFirstLetter(removeLastLetter(string));

/**
 * Accepts undefined/null so form validation works properly.
 * Regex tests that it can start with a "-", any number of digits, and can end with a "." followed by any number of digits.
 */
export const isNumber = string =>
  string === undefined || string === null || /^-?\d*\.?\d*$/.test(string);

/**
 * Returns true if string is falsey or contains whitespace
 */
export const isEmpty = string => !string || !/\S/.test(string);
