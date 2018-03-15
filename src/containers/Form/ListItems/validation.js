const validate = (values, props) => {
  let errors = {};
  props.fieldItems.forEach(field => {
    const value = values.get(field.name);
    if (field.required && !value) {
      errors[field.name] = 'Please enter a value';
    } else if (field.type === 'number' && value && isNaN(value)) {
      errors[field.name] = 'Value must be a number';
    }
  });
  return errors;
};
export default validate;
