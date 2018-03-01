export const capitalizeFirstLetter = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const removeLastLetter = string =>
  string.substring(0, string.length - 1);
