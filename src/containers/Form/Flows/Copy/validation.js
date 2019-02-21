import { isEmpty } from 'serenova-js-utils/strings';

export default function(values, props) {
  let validation = {};
  const { names, drafts, subEntityId } = props;

  validation.name = isEmpty(values.get('name')) && 'Please enter a name';
  if (subEntityId === 'drafts' && drafts.includes(values.get('name'))) {
    validation.name = 'Draft with the same name already exists for this Flow, please enter a different value';
  } else if (subEntityId !== 'drafts' && names.includes(values.get('name'))) {
    validation.name = 'Flow with the same name already exists, please enter a different value';
  }

  return validation;
}
