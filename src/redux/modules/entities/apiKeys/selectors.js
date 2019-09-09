import { Map } from 'immutable';
import { getSelectedEntity } from '../selectors';
import { selectTenantRoles } from '../roles/selectors';

export const getInitialUpdateFormValues = state =>
  new Map({
    name: getSelectedEntity(state).get('name'),
    description: getSelectedEntity(state).get('description'),
    roleId: getSelectedEntity(state).get('roleId'),
    id: getSelectedEntity(state).get('id'),
    secret: getSelectedEntity(state).get('secret')
  });

export const getInitialCreateFormValues = state =>
  new Map({
    roleId: selectTenantRoles(state).length > 0 ? selectTenantRoles(state)[0].value : ''
  });
