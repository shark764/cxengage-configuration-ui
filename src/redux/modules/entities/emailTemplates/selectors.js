import { Map } from 'immutable';
import { getSelectedEntity } from '../selectors';

export const getInitialFormValues = state => {
  const selectedEntity = getSelectedEntity(state);
  const template = selectedEntity.get('template');
  const inherited = selectedEntity.get('inherited');
  let initialValues;
  if (template.get('tenantId') === inherited.get('tenantId')) {
    initialValues = {
      email: 'default',
      shared: false,
      subject: inherited.get('subject'),
      body: inherited.get('body')
    };
  } else {
    initialValues = {
      email: 'custom',
      shared: template.get('shared'),
      subject: template.get('subject'),
      body: template.get('body')
    };
  }
  return new Map(initialValues);
};

export const getTemplates = state =>
  getSelectedEntity(state)
    .get('variables')
    .map(variable => variable.get('name'))
    .toJS();

export const getVariables = state =>
  getSelectedEntity(state)
    .get('variables')
    .toJS();

const getInherited = state => getSelectedEntity(state).get('inherited');

export const getInheritedSubject = state => getInherited(state).get('subject');

export const getInheritedBody = state => getInherited(state).get('body');

const getTemplate = state => getSelectedEntity(state).get('template');

export const getTemplateEmail = state =>
  getTemplate(state).get('tenantId') === getInherited(state).get('tenantId') ? 'Default' : 'Custom';

export const getTemplateShared = state => (getTemplate(state).get('shared') ? 'Yes' : 'No');

export const getTemplateSubject = state => getTemplate(state).get('subject');

export const getTemplateBody = state => getTemplate(state).get('body');
