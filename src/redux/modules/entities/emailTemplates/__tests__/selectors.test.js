/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import {
  getInitialFormValues,
  getTemplates,
  getVariables,
  getInheritedSubject,
  getInheritedBody,
  getTemplateEmail,
  getTemplateShared,
  getTemplateSubject,
  getTemplateBody
} from '../selectors';
import { getSelectedEntity } from '../../selectors';

const mockCurrentForm = fromJS({
  values: {
    email: 'mock email value'
  }
});
jest.mock('../../../form/selectors', () => ({
  getCurrentForm: () => mockCurrentForm
}));

jest.mock('../../selectors');
const mockSelectedEntity = fromJS({
  inherited: {
    tenantId: 'mock tenant id 1',
    subject: 'mock inherited subject',
    body: 'mock inherited body'
  },
  template: {
    tenantId: 'mock tenant id 2',
    shared: true,
    subject: 'mock template subject',
    body: 'mock template body'
  },
  variables: [{ name: 'mock variable 1' }, { name: 'mock variable 2' }]
});
getSelectedEntity.mockImplementation(() => mockSelectedEntity);

describe('getInitialFormValues', () => {
  it('gets the custom email values when the tenantIds are different', () => {
    expect(getInitialFormValues()).toMatchSnapshot();
  });
  it('gets the inherited email values when the tenantIds are the same', () => {
    getSelectedEntity.mockImplementation(() => mockSelectedEntity.setIn(['inherited', 'tenantId'], 'mock tenant id 2'));
    expect(getInitialFormValues()).toMatchSnapshot();
  });
});

describe('getTemplates', () => {
  it('returns the variables names mapped to an array', () => {
    expect(getTemplates()).toMatchSnapshot();
  });
});

describe('getVariables', () => {
  it('gets the variables and converts them from immutable to javascript', () => {
    expect(getVariables()).toMatchSnapshot();
  });
});

describe('getInheritedSubject', () => {
  it('gets the inherited subject', () => {
    expect(getInheritedSubject()).toEqual('mock inherited subject');
  });
});

describe('getInheritedBody', () => {
  it('gets the inherited body', () => {
    expect(getInheritedBody()).toEqual('mock inherited body');
  });
});

describe('getTemplateEmail', () => {
  it('returns "Custom" when the inherited and template emails have different tenantIds', () => {
    getSelectedEntity.mockImplementation(() => mockSelectedEntity.setIn(['template', 'tenantId'], 'mock tenant id 2'));
    expect(getTemplateEmail()).toEqual('Custom');
  });
  it('returns "Default" when the inherited and template emails have the same tenantId', () => {
    getSelectedEntity.mockImplementation(() => mockSelectedEntity.setIn(['template', 'tenantId'], 'mock tenant id 1'));
    expect(getTemplateEmail()).toEqual('Default');
  });
});

describe('getTemplateShared', () => {
  it('returns "Yes" when the template is shared', () => {
    expect(getTemplateShared()).toEqual('Yes');
  });
  it('returns "No" when the template is not shared', () => {
    getSelectedEntity.mockImplementation(() => mockSelectedEntity.setIn(['template', 'shared'], false));
    expect(getTemplateShared()).toEqual('No');
  });
});

describe('getTemplateSubject', () => {
  it('gets the template subject', () => {
    expect(getTemplateSubject()).toEqual('mock template subject');
  });
});

describe('getTemplateBody', () => {
  it('gets the template body', () => {
    expect(getTemplateBody()).toEqual('mock template body');
  });
});
