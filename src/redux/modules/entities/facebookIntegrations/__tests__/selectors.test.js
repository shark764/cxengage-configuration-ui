/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectFormInitialValues } from '../../../form/selectors';
import { getSelectedEntity } from '../../selectors';
import { selectFacebookIntegrationsFormInitialValues } from '../selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');

describe('selectFacebookIntegrationsFormInitialValues', () => {
  it('Initial values when creating a new facebook integration', () => {
    expect(selectFacebookIntegrationsFormInitialValues(fromJS([]))).toMatchSnapshot();
  });
  it('Gets the correct facebook integrations', () => {
    const initialState = fromJS({
      id: 'mockId1',
      appId: 'mockAppId1',
      name: 'mockName1',
      clientDisconnectMinutes: 1,
    });
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectFacebookIntegrationsFormInitialValues()).toMatchSnapshot();
  });
});
