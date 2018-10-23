import { getCurrentForm } from '../../form/selectors';

export const getHasProficiencyFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'hasProficiency']);
  