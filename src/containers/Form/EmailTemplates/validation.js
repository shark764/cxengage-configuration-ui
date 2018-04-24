import { isEmpty } from '../../../utils/string';

export const validate = values => {
  const errors = {};
  if (values.get('email') === 'custom') {
    if (isEmpty(values.get('body'))) {
      errors.body = 'Please enter a body';
    }
    if (isEmpty(values.get('subject'))) {
      errors.subject = 'Please enter a subject';
    }
  }
  return errors;
};
