import { isEmpty, isNumber } from 'serenova-js-utils/strings';

export default function(values, props) {
  let errors = {};
  props.fieldItems.forEach(field => {
    const value = values.get(field.name);
    // isEmpty function will result in 'false' when testing boolean value
    // when boolean values are validated, will only be invalid when none is selected
    if (field.required && isEmpty(value) && typeof value !== 'boolean') {
      errors[field.name] = 'Please enter a value';
    } else if (field.type === 'number' && !isNumber(value)) {
      errors[field.name] = 'Value must be a number';
    }
  });
  return errors;
}
