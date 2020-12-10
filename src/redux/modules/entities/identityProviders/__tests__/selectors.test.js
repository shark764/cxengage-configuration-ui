/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { selectTenantIdentityProviders, selectIdentityProvidersFormInitialValues } from '../selectors';
import { getSelectedEntity } from '../../selectors';
import { selectFormInitialValues } from '../../../form/selectors';

jest.mock('../../selectors');
jest.mock('../../../form/selectors');

const initialState = fromJS({
  Entities: {
    identityProviders: {
      data: [
        {
          id: 'mockId1',
          name: 'mockName1',
          description: 'mockDesc1',
          active: true
        },
        {
          id: 'mockId2',
          name: 'mockName2',
          description: 'mockDesc2',
          active: false
        }
      ],
      userExistInPlatform: true
    }
  }
});

describe('selectTenantIdentityProviders', () => {
  it('Gets the correct IDPs', () => {
    expect(selectTenantIdentityProviders(initialState)).toMatchSnapshot();
  });
  it('Does not get any IDPs from state', () => {
    expect(selectTenantIdentityProviders(fromJS([]))).toMatchSnapshot();
  });
});

describe('selectIdentityProvidersFormInitialValues', () => {
  it('Gets the IDPs initial form values when creating a new entity', () => {
    getSelectedEntity.mockImplementation(() => {});
    expect(selectIdentityProvidersFormInitialValues()).toMatchSnapshot();
  });
  it('Return initial form values when updating an entity', () => {
    getSelectedEntity.mockImplementation(() => initialState);
    selectFormInitialValues.mockImplementation(() => initialState);
    expect(selectIdentityProvidersFormInitialValues()).toMatchSnapshot();
  });
});
