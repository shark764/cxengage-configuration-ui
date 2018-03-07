export const capitalizeFirstLetter = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const removeLastLetter = string =>
  string.substring(0, string.length - 1);

export const camelCaseToKebabCase = string =>
  string.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });
