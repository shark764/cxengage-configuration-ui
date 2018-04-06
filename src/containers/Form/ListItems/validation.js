import { atLeastOneLetterOrNumber } from '../../../utils/string';

export default function(values, props) {
  let errors = {};
  props.fieldItems.forEach(field => {
    const value = values.get(field.name);
    if (
      field.required &&
      (value === undefined ||
        value === null ||
        (typeof value === 'string' && !atLeastOneLetterOrNumber.test(value)))
    ) {
      errors[field.name] = 'Please enter a value';
    } else if (
      value !== null &&
      field.type === 'number' &&
      value !== undefined &&
      !atLeastOneLetterOrNumber.test(value)
    ) {
      errors[field.name] = 'Value must be a number';
    }
  });
  return errors;
}