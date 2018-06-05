import {
  capitalizeFirstLetter,
  removeLastLetter,
  camelCaseToKebabCase,
  camelCaseToRegularForm,
  camelCaseToRegularFormAndRemoveLastLetter,
  camelCaseToKebabCaseAndRemoveLastLetter,
  capitalizeFirstAndRemoveLastLetter,
  isNumber,
  isEmpty
} from '../string';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('string')).toEqual('String');
  });
});

describe('removeLastLetter', () => {
  it('removes the last letter of a string', () => {
    expect(removeLastLetter('strings')).toEqual('string');
  });
});

describe('camelCaseToKebabCase', () => {
  it('converts camel case string to kebab case', () => {
    expect(camelCaseToKebabCase('camelCase')).toEqual('camel-case');
    expect(camelCaseToKebabCase('lowercase')).toEqual('lowercase');
  });
});

describe('camelCaseToRegularForm', () => {
  it('converts camel case to regular form', () => {
    expect(camelCaseToRegularForm('camelCase')).toEqual('Camel Case');
    expect(camelCaseToRegularForm('string')).toEqual('String');
  });
});

describe('camelCaseToRegularFormAndRemoveLastLetter', () => {
  it('does camelCaseToRegularForm and removeLastLetter', () => {
    expect(camelCaseToRegularFormAndRemoveLastLetter('camelCases')).toEqual(
      'Camel Case'
    );
  });
});

describe('camelCaseToKebabCaseAndRemoveLastLetter', () => {
  it('does camelCaseToKebabCase and removeLastLetter', () => {
    expect(camelCaseToKebabCaseAndRemoveLastLetter('camelCases')).toEqual(
      'camel-case'
    );
  });
});

describe('capitalizeFirstAndRemoveLastLetter', () => {
  it('capitalizes the first letter and removes the last letter', () => {
    expect(capitalizeFirstAndRemoveLastLetter('strings')).toEqual('String');
  });
});

describe('isNumber', () => {
  it('true when it is a number', () => {
    expect(isNumber('1')).toBe(true);
    expect(isNumber('-1')).toBe(true);
    expect(isNumber('0.1')).toBe(true);
    expect(isNumber('.1')).toBe(true);
    expect(isNumber('-0.1')).toBe(true);
    expect(isNumber('-.1')).toBe(true);
  });
  it('true when it is empty', () => {
    expect(isNumber('')).toBe(true);
    expect(isNumber(undefined)).toBe(true);
    expect(isNumber(null)).toBe(true);
  });
  it('false when it is not a number', () => {
    expect(isNumber('a')).toBe(false);
    expect(isNumber('1.2a')).toBe(false);
    expect(isNumber(' ')).toBe(false);
  });
});

describe('isEmpty', () => {
  it('true when falsey', () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
  });
  it('true when whitespace only', () => {
    expect(isEmpty(' ')).toBe(true);
    expect(isEmpty('  ')).toBe(true); // tab
  });
  it('false when string contains characters', () => {
    expect(isEmpty(' a')).toBe(false);
  });
});
