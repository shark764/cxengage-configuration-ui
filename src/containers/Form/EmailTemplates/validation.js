import { containsNonWhiteSpace } from '../../../utils/string';

export const validate = values => {
  const errors = {};
  if (values.get('email') === 'custom') {
    if (!containsNonWhiteSpace(values.get('body'))) {
      errors.body = 'Please enter a body';
    }
    if (!containsNonWhiteSpace(values.get('subject'))) {
      errors.subject = 'Please enter a subject';
    }
  }
  return errors;
};
