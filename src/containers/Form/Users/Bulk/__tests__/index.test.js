/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../../redux/modules/form/selectors';
import UsersBulkActionsForm, { mapStateToProps, createFormName } from '../';
import { getCurrentEntity, isCreating, getEntityData } from '../../../../../redux/modules/entities/selectors';
import { selectTenantIdentityProviders } from '../../../../../redux/modules/entities/identityProviders/selectors';
import { getCheckedBulkActionFormValue } from '../../../../../redux/modules/entities/users/selectors';

jest.mock('../../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');

jest.mock('../../../../../redux/modules/entities/selectors');
getCurrentEntity.mockImplementation(() => 'users');
isCreating.mockImplementation(() => true);
getEntityData.mockImplementation(() => new Map({}));

jest.mock('../../../../../redux/modules/entities/users/selectors');
getCheckedBulkActionFormValue.mockImplementation(() => true);

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
