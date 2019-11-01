/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentFormValueByFieldName } from '../../../../../redux/modules/form/selectors';
import ReasonsBulkActionsForm, { mapStateToProps, createFormName } from '../';
import {
  getCurrentEntity,
  isSaving,
  userHasUpdatePermission,
  userHasSharePermission,
  isBulkUpdating
} from '../../../../../redux/modules/entities/selectors';

jest.mock('../../../../../redux/modules/form/selectors');
getCurrentFormValueByFieldName.mockImplementation(() => true);

jest.mock('../../../../../redux/modules/entities/selectors');
getCurrentEntity.mockImplementation(() => 'reasons');
isSaving.mockImplementation(() => true);
isBulkUpdating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
userHasSharePermission.mockImplementation(() => true);

describe('GenericBulkItems Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ReasonsBulkActionsForm store={store}>Child</ReasonsBulkActionsForm>)).toMatchSnapshot();
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
