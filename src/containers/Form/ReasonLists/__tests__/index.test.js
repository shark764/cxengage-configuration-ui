/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { Map, List } from 'immutable';
import { shallow } from 'enzyme';
import {
  getCurrentForm,
  createFormName,
  formSubmission,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import ReasonListsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isSaving,
  isEntityFetching,
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../../redux/modules/entities/selectors';
import { reasonListsInitialValues, checkDisableShared } from '../../../../redux/modules/entities/reasonLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/reasons/selectors');
jest.mock('../../../../redux/modules/entities/reasonLists/selectors');
isEntityFetching.mockImplementation(() => false);
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isSaving.mockImplementation(() => true);
reasonListsInitialValues.mockImplementation(
  () => new Map({ active: true, isDefault: false, shared: false, reasons: [] })
);
getCurrentFormValueByFieldName.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
userHasSharePermission.mockImplementation(() => true);
checkDisableShared.mockImplementation(() => false);

describe('reasonLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ReasonListsForm store={store}>Child</ReasonListsForm>)).toMatchSnapshot();
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
  const values = new Map({
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    shared: true,
    active: false,
    externalId: 'mockExternalId',
    isDefault: false,
    reasons: new List([{}])
  });
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
