import { isEmpty } from 'serenova-js-utils/strings';

export default function(values, props) {
  let validation = {};
  validation.name = isEmpty(values.get('name')) && 'Please enter a name';

  const { names } = props;
  if (names.includes(values.get('name'))) {
    validation.name = 'Flow with the same name already exists, please enter a different value';
  }

  return validation;
}
