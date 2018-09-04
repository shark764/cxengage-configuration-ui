import { getCurrentForm } from '../../form/selectors';

export const getAbandonTypeFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'slaAbandonType']);
  