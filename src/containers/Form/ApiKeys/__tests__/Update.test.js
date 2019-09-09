/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import UpdateApiKeyForm, { mapStateToProps } from '../Update';
import { getSelectedEntityId, isUpdating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isUpdating.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

jest.mock('../../../../redux/modules/entities/apiKeys/selectors', () => ({
  getInitialUpdateFormValues: () => 'mock initial update form values',
  getSecretApiKey: () => 'mock Api Key secret'
}));

jest.mock('../../../../redux/modules/entities/roles/selectors', () => ({
  selectTenantRoles: () => 'mock list roles options'
}));

describe('UpdateApiKeyForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<UpdateApiKeyForm store={store}>Child</UpdateApiKeyForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
