/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map, fromJS } from 'immutable';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentFormValueByFieldName, selectFormInitialValues } from '../../../../../redux/modules/form/selectors';
import UsersBulkActionsForm, { mapStateToProps, createFormName } from '../';
import {
  getCurrentEntity,
  isSaving,
  getEntityData,
  userHasPermissions,
  isBulkUpdating
} from '../../../../../redux/modules/entities/selectors';
import { selectTenantIdentityProviders } from '../../../../../redux/modules/entities/identityProviders/selectors';

jest.mock('../../../../../redux/modules/form/selectors');
getCurrentFormValueByFieldName.mockImplementation(() => true);

jest.mock('../../../../../redux/modules/entities/selectors');
getCurrentEntity.mockImplementation(() => 'users');
isSaving.mockImplementation(() => true);
getEntityData.mockImplementation(() => new Map({}));
userHasPermissions.mockImplementation(() => true);
isBulkUpdating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => fromJS({ status: 'accepted' }));

jest.mock('../../../../../redux/modules/entities/identityProviders/selectors');
selectTenantIdentityProviders.mockImplementation(() => ({ label: 'idp1', value: '0001' }));

describe('GenericBulkItems Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<UsersBulkActionsForm store={store}>Child</UsersBulkActionsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});
