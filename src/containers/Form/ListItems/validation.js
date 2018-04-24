import { isEmpty, isNumber } from '../../../utils/string';

export default function(values, props) {
  let errors = {};
  props.fieldItems.forEach(field => {
    const value = values.get(field.name);
    if (field.required && isEmpty(value)) {
      errors[field.name] = 'Please enter a value';
    } else if (field.type === 'number' && !isNumber(value)) {
      errors[field.name] = 'Value must be a number';
    }
  });
  return errors;
}
