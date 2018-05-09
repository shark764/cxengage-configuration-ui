import { getCurrentForm } from '../../form/selectors';

export const getEmailTemplateFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'email']);
