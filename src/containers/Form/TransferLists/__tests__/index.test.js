/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import TransferListsForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/transferLists/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

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
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
