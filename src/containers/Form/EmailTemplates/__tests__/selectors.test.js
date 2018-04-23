/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { getInitialValues, getTemplates } from '../selectors';
import { getSelectedEntity } from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
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

describe('getInitialValues', () => {
  it('gets the custom email values when the tenantIds are different', () => {
    expect(getInitialValues()).toMatchSnapshot();
  });
  it('gets the inherited email values when the tenantIds are the same', () => {
    getSelectedEntity.mockImplementation(() =>
      mockSelectedEntity.setIn(['inherited', 'tenantId'], 'mock tenant id 2')
    );
    expect(getInitialValues()).toMatchSnapshot();
  });
});

describe('getTemplates', () => {
  it('returns the variables names mapped to an array', () => {
    expect(getTemplates()).toMatchSnapshot();
  });
});
