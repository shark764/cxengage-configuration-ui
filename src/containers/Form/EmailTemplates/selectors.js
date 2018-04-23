/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import {
  getSelectedEntity
} from '../../../redux/modules/crudEndpoint/selectors';

export const getInitialValues = state => {
  const selectedEntity = getSelectedEntity(state);
  const template = selectedEntity.get('template');
  const inherited = selectedEntity.get('inherited');
  let initialValues;
  if (
    template.get('tenantId') ===
    inherited.get('tenantId')
  ) {
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
}

export const getTemplates = state =>
 getSelectedEntity(state)
  .get('variables')
  .map(variable => variable.get('name'))
  .toJS()
