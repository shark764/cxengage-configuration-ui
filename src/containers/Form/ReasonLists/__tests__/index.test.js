/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import reasonListsForm from '../layout';
import { getCurrentForm, createFormName, formSubmission } from '../../../../redux/modules/form/selectors';
import { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { getCurrentSharedValue } from '../../../../redux/modules/entities/reasons/selectors';
import { reasonListsInitialValues, checkDisableShared } from '../../../../redux/modules/entities/reasonLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/reasons/selectors');
jest.mock('../../../../redux/modules/entities/reasonLists/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
reasonListsInitialValues.mockImplementation(
  () => new Map({ active: true, isDefault: false, shared: false, reasons: [] })
);
getCurrentSharedValue.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
checkDisableShared.mockImplementation(() => false);

describe('reasonLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<reasonListsForm store={store}>Child</reasonListsForm>)).toMatchSnapshot();
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
    description: 'mockDescription',
    shared: true,
    active: false,
    externalId: 'mockExternalId',
    isDefault: false,
    reasons: []
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
