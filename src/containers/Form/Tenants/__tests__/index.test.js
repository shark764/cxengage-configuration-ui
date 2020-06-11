/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import TenantsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isCreating,
  userHasUpdatePermission,
  getCurrentEntity,
  getEntities
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../../redux/modules/form/selectors';
import { getUsers } from '../../../../redux/modules/entities/users/selectors';
import { getRegions } from '../../../../redux/modules/entities/regions/selectors';
import { getTimezones } from '../../../../redux/modules/entities/timezones/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/tenants/selectors');
jest.mock('../../../../redux/modules/entities/users/selectors');
jest.mock('../../../../redux/modules/entities/regions/selectors');
jest.mock('../../../../redux/modules/userData/selectors');
jest.mock('../../../../redux/modules/entities/timezones/selectors');

getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getCurrentEntity.mockImplementation(() => 'tenants');
getEntities.mockImplementation(() => 'mockEntitites');
getRegions.mockImplementation(() => 'mockRegions');
getTimezones.mockImplementation(() => 'mockTimezone');
getUsers.mockImplementation(() => 'mockUers');
isCreating.mockImplementation(() => true);

describe('Tenants Renders', () => {
  it('renders', () => {
    const state = fromJS({ Entities: { currentTenantId: 'mockTenantId' } });
    const store = createStore(() => state);
    expect(shallow(<TenantsForm store={store}>Child</TenantsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps(fromJS({ Entities: { currentTenantId: 'mockTenantId' } }))).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  // Change values to match the form your making
  // If you see this in a PR the unit tests may not have been completed
  // const values = { name: 'mockName', value: 'mockValue' };
  // ERASE THIS COMMENTS AFTER YOUR ENTITY IS GENERATED
  const values = {
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    type: 'mockType'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
