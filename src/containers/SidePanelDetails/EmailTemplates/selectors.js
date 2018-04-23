import { getSelectedEntity } from '../../../redux/modules/entities/selectors';

export const getVariables = state =>
  getSelectedEntity(state)
    .get('variables')
    .toJS();

const getInherited = state => getSelectedEntity(state).get('inherited');

export const getInheritedSubject = state => getInherited(state).get('subject');

export const getInheritedBody = state => getInherited(state).get('body');

const getTemplate = state => getSelectedEntity(state).get('template');

export const getTemplateEmail = state =>
  getTemplate(state).get('tenantId') === getInherited(state).get('tenantId')
    ? 'Default'
    : 'Custom';

export const getTemplateShared = state =>
  getTemplate(state).get('shared') ? 'Yes' : 'No';

export const getTemplateSubject = state => getTemplate(state).get('subject');

export const getTemplateBody = state => getTemplate(state).get('body');
