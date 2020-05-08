/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import TransferListsForm, { mapStateToProps } from '../';
import { createFormName, formSubmission } from '../../../../redux/modules/form/selectors';
import {
  getSelectedEntityId,
  isSaving,
  userHasUpdatePermission,
  isEntityFetching
} from '../../../../redux/modules/entities/selectors';
import {
  selectEndpointHeaders,
  transferListsFormInitialValues
} from '../../../../redux/modules/entities/transferLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/transferLists/selectors');
isSaving.mockImplementation(() => true);
isEntityFetching.mockImplementation(() => false);
getSelectedEntityId.mockImplementation(() => 'mockId');
transferListsFormInitialValues.mockImplementation(() => 'mock transferList initial values');
selectEndpointHeaders.mockImplementation(() => 'mockEndpointHeaders');
getCurrentForm.mockImplementation(() => 'gets form from state');
userHasUpdatePermission.mockImplementation(() => true);

describe('TransferLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<TransferListsForm store={store}>Child</TransferListsForm>)).toMatchSnapshot();
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

describe('formSubmission', () => {
  const values = {
    name: 'mockName',
    description: 'mockDescription',
    endpoints: 'mockEndpoints'
  };
  const dispatch = action => action;
  const props = {
    isSaving: true,
    isFetching: false,
    initialized: true,
    dirty: true
  };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
